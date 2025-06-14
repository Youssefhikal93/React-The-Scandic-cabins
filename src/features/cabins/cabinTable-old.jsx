import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apicabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  text-align: start;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;
  return (
    <Table>
      <TableHeader role="table">
        <div>Image</div>
        <div>Cabin Name</div>
        <div>Capicity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
