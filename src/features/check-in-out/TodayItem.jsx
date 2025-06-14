import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.2rem;
  align-items: center;
  padding: 1.2rem;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  @media (min-width: 768px) {
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  }

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  word-break: break-word;
`;
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} Nights</div>
      {status === "unconfirmed" && (
        <Button
          as={Link}
          to={`/checkin/${id}`}
          size="small"
          variation="primary"
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
