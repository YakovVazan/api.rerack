import FilterAndLayout from "../FilterAndLayout/FilterAndLayout";
import List from "../List/List";
import "./Body.css";

const Body = () => {
  return (
    <div id="main-container">
      <span id="filter-and-layout-container-for-nav">
        <FilterAndLayout />
      </span>
      <List />
    </div>
  );
};

export default Body;
