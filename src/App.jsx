import { useState } from "react";
import Context from "./assets/Context/Context.jsx";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";
import SortData from "./assets/Data/SortData.jsx";

const App = () => {
  const [view, setView] = useState(
    localStorage.getItem("rerackView") === "list" ? "list" : "gallery"
  );
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [companyFilterValue, setCompanyFilterValue] = useState("");
  const [orderBy, setOrderBy] = useState(
    localStorage.getItem("rerackOrder") !== null ? localStorage.getItem("rerackOrder") : "name"
  );
  const [orderedData, setOrderedData] = useState(SortData("name"));

  localStorage.setItem("rerackOrder", orderBy);

  return (
    <>
      <Context.Provider
        value={{
          setOrderBy,
          setOrderedData,
          setSearchBoxValue,
          setTypeFilterValue,
          setCompanyFilterValue,
          setView,
          orderBy,
          orderedData,
          searchBoxValue,
          typeFilterValue,
          companyFilterValue,
          view,
        }}
      >
        <Nav />
        <Body />
      </Context.Provider>
    </>
  );
};

export default App;
