import { useContext } from "react";
import SeekingContext from "../../../../assets/Seeking/SeekingContext.jsx";
import Data from "../../../../assets/Data/Data.jsx";
import "./TypeDropDown.css";

const TypeDropDown = () => {
  const setTypeFilterValue = useContext(SeekingContext)["setTypeFilterValue"];
  const uniqueType = new Set();

  Data.forEach((plug) => {
    uniqueType.add(plug.type);
  });

  const TypesList = [...uniqueType];

  function handleClick(typeName) {
    document.querySelector("#type-filter").innerHTML =
      typeName !== "" ? typeName : "type";
    setTypeFilterValue(typeName);
  }

  return (
    <>
      <div className="dropdown-center search-button-container">
        <button
          id="type-filter"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          type
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleClick("")}>
            all
          </div>
          <hr className="dropdown-divider"></hr>
          {TypesList.map((type, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
