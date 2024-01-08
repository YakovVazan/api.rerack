import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import PluginData from "./assets/Data/Data.jsx";
import DataContext from "./assets/Data/DataContext.jsx";
import Body from "./components/Main/Body/Body.jsx";

const App = () => {
  const PluginsList = PluginData[0];
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [view, setView] = useState("list");

  return (
    <>
      <Header setSearchBoxValue={setSearchBoxValue} />
      <DataContext.Provider
        value={{ PluginsList, searchBoxValue, view, setView }}
      >
        <Body />
      </DataContext.Provider>
    </>
  );
};

export default App;
