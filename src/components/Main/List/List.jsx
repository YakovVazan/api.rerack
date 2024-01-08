import { useContext, useState } from "react";
import "./List.css";
import DataContext from "../../../assets/Data/DataContext.jsx";

const List = () => {
  const data = useContext(DataContext);
  const pluginsData = data["PluginsList"]["FabFilter"];
  const searchBoxValue = data["searchBoxValue"];
  const view = data["view"];
  const [selectedItem, setSelectedItem] = useState(-1);

  function handleFocusStart(focuesItem) {
    setSelectedItem(focuesItem);
  }

  function handleFocusEnd() {
    setSelectedItem(-1);
  }

  return (
    <>
      {/* <ul className="list-group">
        {pluginsData.map((plug, index) => (
          <li
            className={
              searchBoxValue === "" ||
              plug["name"].toLowerCase().includes(searchBoxValue)
                ? selectedItem === index
                  ? "list-group-item plugin-item-list active"
                  : "list-group-item plugin-item-list"
                : "d-none"
            }
            key={index}
            onMouseDown={() => handleFocusStart(index)}
            onTouchStart={() => handleFocusStart(index)}
            onMouseUp={handleFocusEnd}
            onTouchEnd={handleFocusEnd}
          >
            <img
              className="plugin-image-list"
              src={plug["src"]}
              alt={plug["name"]}
            />
            <span className="plugin-name-list">{plug["name"]}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </li>
        ))}
      </ul> */}

      <ul className={view === "list" ? "list-group" : "galery-ul"}>
        {pluginsData.map((plug, index) => (
          <li
            className={`${
              view === "list"
                ? "plugin-item-list list-group-item"
                : "plugin-item-galery galery-li card"
            } ${
              searchBoxValue === "" ||
              plug["name"].toLowerCase().includes(searchBoxValue)
                ? selectedItem === index
                  ? "active"
                  : ""
                : "d-none"
            }`}
            key={index}
            onMouseDown={() => handleFocusStart(index)}
            onTouchStart={() => handleFocusStart(index)}
            onMouseUp={handleFocusEnd}
            onTouchEnd={handleFocusEnd}
          >
            <img
              className={`card-img-top ${
                view === "list" ? "plugin-image-list" : "plugin-image-galery"
              }`}
              src={plug["src"]}
              alt={plug["name"]}
            />
            <span
              className={
                view === " list" ? "plugin-name-list" : "plugin-name-galery"
              }
            >
              {plug["name"]}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className={`bi bi-chevron-right ${
                view === "galery" && "hide-plugin-arrow"
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
