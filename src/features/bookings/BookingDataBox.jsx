import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: 2.4rem;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 1.6rem 2rem;
  color: #e0e7ff;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 4rem;
    font-size: 1.8rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;

    @media (min-width: 768px) {
      height: 3.2rem;
      width: 3.2rem;
    }
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-weight: 600;
    font-size: 1.6rem;

    @media (min-width: 768px) {
      font-size: 1.8rem;
      gap: 1.6rem;
    }
  }

  & span {
    font-family: "Sono";
    font-size: 1.6rem;
    margin-left: 4px;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Section = styled.section`
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 3.2rem 4rem 1.2rem;
  }
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }

  & > p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  & > span {
    display: none;

    @media (min-width: 768px) {
      display: inline;
    }
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.6rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 3.2rem;
  }

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  }

  svg {
    height: 2rem;
    width: 2rem;

    @media (min-width: 768px) {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  color: var(--color-grey-500);
  text-align: center;

  @media (min-width: 768px) {
    padding: 1.6rem 4rem;
    font-size: 1.2rem;
    text-align: right;
  }
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests = {}, // fallback to empty object
    cabins = {}, // fallback to empty object
    // guests: { fullName: guestName, email, country, countryFlag, nationalID },
    // cabins: { name: cabinName },
  } = booking;
  const {
    fullName: guestName,
    email,
    country,
    countryFlag,
    nationalID,
  } = guests;

  const { name: cabinName } = cabins;
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
