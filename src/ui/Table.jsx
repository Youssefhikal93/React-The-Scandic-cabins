import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: auto;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    border-radius: 5px;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1.6rem;
  align-items: center;
  transition: none;

  @media (max-width: 768px) {
    column-gap: 1rem;
    padding: 1rem;
    grid-template-columns: ${(props) => props.mobileColumns || props.columns};
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    padding: 1.2rem;
    display: ${(props) => (props.hideOnMobile ? "none" : "grid")};
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    grid-template-columns: ${(props) => props.mobileColumns || props.columns};
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  min-width: fit-content;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 1.6rem;
  }
`;
const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (!data.length) return <Empty>No data</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
