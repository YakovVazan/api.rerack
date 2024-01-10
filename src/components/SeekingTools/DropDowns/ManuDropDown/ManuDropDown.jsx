import { useContext } from "react";
import SeekingContext from "../../../../assets/Seeking/SeekingContext.jsx";
import Data from "../../../../assets/Data/Data.jsx";
import "./ManuDropDown.css";

const TypeDropDown = () => {
  const setManuFilterValue = useContext(SeekingContext)["setManuFilterValue"];
  const ManusList = [...new Set(Data.map((plug) => plug.manufacturer))];

  function handleClick(manuName) {
    document.querySelector("#manu-filter").innerHTML =
      manuName !== "" ? manuName : "factory";
    setManuFilterValue(manuName);
  }

  return (
    <>
      <div className="dropdown-center search-button-container">
        <button
          id="manu-filter"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          factory
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleClick("")}>
            all
          </div>
          <hr className="dropdown-divider"></hr>
          {ManusList.map((manu, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(manu)}
            >
              {manu}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
