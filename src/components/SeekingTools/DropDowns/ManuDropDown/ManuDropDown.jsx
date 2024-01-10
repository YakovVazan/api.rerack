import { useContext } from "react";
import Data from "../../../../assets/Data/Data.jsx";
import Context from "../../../../assets/Context/Context.jsx";
import "./ManuDropDown.css";

const TypeDropDown = () => {
  const setManuFilterValue = useContext(Context)["setManuFilterValue"];
  const ManusList = [...new Set(Data.map((plug) => plug.manufacturer))];

  function handleClick(manuName) {
    document.querySelector("#inner-button-text-manu").innerHTML =
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
          <span id="inner-button-text-manu">factory</span>
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
