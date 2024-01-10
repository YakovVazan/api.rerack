import SearchBox from "../../SeekingTools/SearchBox/SearchBox.jsx";
import TypeDropDown from "../../SeekingTools/DropDowns/TypeDropDown/TypeDropDown.jsx";
import ManuDropDown from "../../SeekingTools/DropDowns/ManuDropDown/ManuDropDown.jsx";
import FilterAndLayout from "../../SeekingTools/FilterAndLayout/FilterAndLayout.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar";
import "./Nav.css";

const Header = () => {
  return (
    <nav>
      <h1>Plugins</h1>
      <div id="elements-in-nav-container">
        <FilterAndLayout />

        <div id="drop-down-in-nav-container">
          <TypeDropDown />
          <ManuDropDown />
        </div>

        <SearchBox />
      </div>

      <div id="hamburger-for-side-bar">
        <HamburgerAndSideBar />
      </div>
    </nav>
  );
};

export default Header;
