import Layout from "../Layout/Layout";
import Filter from "../Filter/Filter";
import "./FilterAndLayout.css";

const FilterAndLayout = () => {
  return (
    <div id="filter-and-layout-container-for-big-screens">
      <Filter />
      <Layout />
    </div>
  );
};

export default FilterAndLayout;
