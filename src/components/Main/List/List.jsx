import { useContext, useState } from "react";
import Context from "../../../assets/Context/Context.jsx";
import "./List.css";

const List = () => {
  const data = useContext(Context);
  const pluginsData = data["PluginsList"];
  const searchBoxValue = data["searchBoxValue"];
  const typeFilterValue = data["typeFilterValue"];
  const manuFilterValue = data["manuFilterValue"];
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
      <ul className={view === "list" ? "list-group" : "ul-gallery"}>
        {pluginsData.map((plug, index) => (
          <li
            className={`${
              view === "list"
                ? "plugin-item-list list-group-item"
                : "plugin-item-gallery li-gallery card"
            } ${
              (searchBoxValue === "" ||
                plug["name"].toLowerCase().includes(searchBoxValue)) &&
              (typeFilterValue === "" || plug["type"] === typeFilterValue) &&
              (manuFilterValue === "" ||
                plug["manufacturer"] === manuFilterValue)
                ? view === "list" && selectedItem === index
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
            <div
              className={
                view === "list"
                  ? "img-and-text-container-list"
                  : "img-and-text-container-gallery"
              }
            >
              <img
                className={
                  view === "list"
                    ? "plugin-image-list"
                    : "card-img-top plugin-image-gallery"
                }
                src={`${
                  plug["src"] !== ""
                    ? plug["src"]
                    : "https://res.cloudinary.com/soundbetter/image/upload/c_fill,f_auto,g_face:auto,h_630,q_90,w_1200/v1504776435/assets/photos/46753/yv_fhs.jpg"
                }`}
                alt={plug["name"]}
              />
              <div
                className={
                  view === "list"
                    ? "name-and-manufacturer-container-list"
                    : "card-body"
                }
              >
                <span
                  className={
                    view === "list" ? "plugin-name-list" : "plugin-name-gallery"
                  }
                >
                  {plug["name"]}
                </span>
                <span
                  className={
                    view === "gallery"
                      ? "d-none"
                      : "manufacturer-and-type-container-list"
                  }
                >
                  <span title="manufacturer">{plug["manufacturer"]}</span>
                  <span id="manufacturer-and-type-dash-list">{" - "}</span>
                  <span className="type-list" title="type">{plug["type"]}</span>
                </span>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className={`bi bi-chevron-right ${
                view === "gallery" && "hide-plugin-arrow"
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
