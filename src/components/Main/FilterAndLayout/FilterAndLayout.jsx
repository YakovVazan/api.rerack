import Layout from "../../SeekingTools/Layout/Layout";
import Filter from "../../SeekingTools/Filter/Filter";
import "./FilterAndLayout.css";

const FilterAndLayout = () => {
  return (
    <div id="filter-and-layout-container-for-big-screens">
      <Layout />
      <Filter />
    </div>
  );
};

export default FilterAndLayout;
