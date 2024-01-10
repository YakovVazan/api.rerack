import { useState } from "react";
import Nav from "./components/Header/Nav/Nav.jsx";
import PluginData from "./assets/Data/Data.jsx";
import DataContext from "./assets/Data/DataContext.jsx";
import Body from "./components/Main/Body/Body.jsx";
import SeekingContext from "./assets/Seeking/SeekingContext.jsx";

const App = () => {
  const PluginsList = PluginData;
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [manuFilterValue, setManuFilterValue] = useState("");
  const [view, setView] = useState("list");

  return (
    <>
      <SeekingContext.Provider
        value={{
          setSearchBoxValue,
          setTypeFilterValue,
          setManuFilterValue,
          setView,
        }}
      >
        <Nav />
        <DataContext.Provider
          value={{
            PluginsList,
            searchBoxValue,
            typeFilterValue,
            manuFilterValue,
            view,
          }}
        >
          <Body />
        </DataContext.Provider>
      </SeekingContext.Provider>
    </>
  );
};

export default App;
