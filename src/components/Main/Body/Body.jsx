import { Routes, Route } from "react-router-dom";
import List from "../List/List";
import Scroller from "../Scroller/Scroller.jsx";
import PlugPage from "../../../pages/PlugPage/PlugPage.jsx";
import NotFound from "../../../pages/NotFound/NotFound.jsx";
import "./Body.css";

const Body = () => {
  return (
    <main id="main-container">
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/plugs/:name" element={<PlugPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Scroller />
    </main>
  );
};

export default Body;
