import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

// const StatsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
//   gap: 1.6rem;
//   width: 100%;
// `;

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;

  //2.
  const sales =
    bookings.reduce((acc, el) => acc + el.totalPrice, 0) /
    (numDays * cabinCount);

  //3.
  const checkIns = confirmedStays.length;

  //4. num checkedin nights / all availbale nights
  const occupation = confirmedStays.reduce((acc, el) => acc + el.numNights, 0);
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation) + "%"}
      />
    </>
  );
}

export default Stats;
