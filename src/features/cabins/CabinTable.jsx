import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, data: cabins } = useCabins();

  // console.log(cabins);
  if (isLoading) return <Spinner />;

  // FILTER
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filteredValue === "all") filteredCabins = cabins;
  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount <= 0 || cabin.discount === null
    );

  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // SORT
  const sortedValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortedValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="minmax(60px, 0.6fr) minmax(120px, 1.8fr) minmax(150px, 2.2fr) minmax(80px, 1fr) minmax(80px, 1fr) minmax(100px, 1fr)">
        <Table.Header role="table">
          <div></div>
          <div>Cabin</div>
          <div>Capicity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        {/* {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
        ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
