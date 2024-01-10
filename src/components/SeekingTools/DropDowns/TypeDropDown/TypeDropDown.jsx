import { useContext } from "react";
import Data from "../../../../assets/Data/Data.jsx";
import Context from "../../../../assets/Context/Context.jsx";
import "./TypeDropDown.css";

const TypeDropDown = () => {
  const data = useContext(Context);
  const setTypeFilterValue = data["setTypeFilterValue"];
  const uniqueType = new Set();

  Data.forEach((plug) => {
    uniqueType.add(plug.type);
  });

  const TypesList = [...uniqueType];

  function handleClick(typeName) {
    document.querySelectorAll(".inner-button-text-type").forEach((element) => {
      element.innerHTML = typeName !== "" ? typeName : "type";
    });
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
          <span className="inner-button-text-type">type</span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu" id="type-drop-down">
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
