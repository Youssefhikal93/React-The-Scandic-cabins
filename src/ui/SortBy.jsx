import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handelChange(e) {
    searchParams.set("sortBy", e.target.value);
    // searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handelChange}
      value={sortBy}
    />
  );
}

export default SortBy;
