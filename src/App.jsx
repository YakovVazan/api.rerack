import { useState } from "react";
import Nav from './components/Header/Nav/Nav.jsx'
import PluginData from "./assets/Data/Data.jsx";
import DataContext from "./assets/Data/DataContext.jsx";
import Body from "./components/Main/Body/Body.jsx";
import SeekingContext from "./assets/Seeking/SeekingContext.jsx";

const App = () => {
  const PluginsList = PluginData[0];
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [view, setView] = useState("list");

  return (
    <>
      <SeekingContext.Provider value={setSearchBoxValue}>
        <Nav />
      </SeekingContext.Provider>

      <DataContext.Provider
        value={{ PluginsList, searchBoxValue, view, setView }}
      >
        <Body />
      </DataContext.Provider>
    </>
  );
};

export default App;
