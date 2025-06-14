import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.2rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1.4rem;
  }
`;

export default TableOperations;
