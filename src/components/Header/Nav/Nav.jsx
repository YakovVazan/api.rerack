import SearchBox from "../../SeekingTools/SearchBox/SearchBox.jsx";
import HamburgerAndSideBar from "../HamburgerAndSideBar/HamburgerAndSideBar";
import "./Nav.css";

const Header = () => {
  return (
    <nav>
      <h1>Plugins</h1>
      <div id="search-box-in-nav-container">
        <SearchBox />
      </div>

      <div id="hamburger-for-side-bar">
        <HamburgerAndSideBar />
      </div>
    </nav>
  );
};

export default Header;
