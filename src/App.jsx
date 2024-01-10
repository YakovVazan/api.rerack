import { useState } from "react";
import PluginData from "./assets/Data/Data.jsx";
import Context from "./assets/Context/Context.jsx";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";

const App = () => {
  const PluginsList = PluginData;
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [manuFilterValue, setManuFilterValue] = useState("");
  const [view, setView] = useState("list");

  return (
    <>
      <Context.Provider
        value={{
          setSearchBoxValue,
          setTypeFilterValue,
          setManuFilterValue,
          setView,
          PluginsList,
          searchBoxValue,
          typeFilterValue,
          manuFilterValue,
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
