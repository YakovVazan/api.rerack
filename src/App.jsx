import { useState } from "react";
import PluginData from "./assets/Data/Data.jsx";
import Context from "./assets/Context/Context.jsx";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";

const App = () => {
  const [view, setView] = useState(
    localStorage.getItem("rerackView") === "list" ? "list" : "gallery"
  );
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [companyFilterValue, setCompanyFilterValue] = useState("");
  const [orderedData, setOrderedData] = useState(PluginData);

  return (
    <>
      <Context.Provider
        value={{
          setOrderedData,
          setSearchBoxValue,
          setTypeFilterValue,
          setCompanyFilterValue,
          setView,
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
