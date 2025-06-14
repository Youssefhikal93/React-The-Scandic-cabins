import styled from "styled-components";
import Filter from "../../ui/Filter";
const FilterContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;
function DashboardFilter() {
  return (
    <FilterContainer>
      <Filter
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ]}
      />
    </FilterContainer>
  );
}

export default DashboardFilter;
