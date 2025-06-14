import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
function BookingTable() {
  const { isLoading, data: bookings, count } = useBookings();
  if (!bookings) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="minmax(60px, 0.6fr) minmax(120px, 1.8fr) minmax(200px, 2.2fr) minmax(120px, 1fr) minmax(80px, 1fr) minmax(100px, 1fr)">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
