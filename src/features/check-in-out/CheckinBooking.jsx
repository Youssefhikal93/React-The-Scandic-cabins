import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import { useSettings } from "../settings/useSettimgs";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useChecking();
  const [confirmedPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSeetings } = useSettings();
  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
    },
    [booking]
  );
  if (isLoading || isLoadingSeetings) return <Spinner />;
  if (!booking) return <p>Booking not found</p>;
  const { guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmedPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmedPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}) `}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
