import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../../assets/Context/Context.jsx";
import "./List.css";

const List = () => {
  const data = useContext(Context);
  const pluginsData = data["PluginData"];
  const searchBoxValue = data["searchBoxValue"];
  const typeFilterValue = data["typeFilterValue"];
  const manuFilterValue = data["manuFilterValue"];
  const view = data["view"];
  const [selectedItem, setSelectedItem] = useState(-1);

  // control 'no plugs found' message
  useEffect(() => {
    const hiddenElements = Array.from(
      document.querySelectorAll(".d-none")
    ).length;

    if (
      (view === "list" && hiddenElements == pluginsData.length) ||
      (view === "gallery" && hiddenElements == pluginsData.length * 2)
    ) {
      document.querySelector("#none-found-message").style.display = "block";
    } else {
      document.querySelector("#none-found-message").style.display = "none";
    }
  });

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
          <Link
            className="item-link"
            to={{
              pathname: `/plug/${plug["name"]
                .replace(/ /g, "_")
                .toLowerCase()}`,
            }}
            state={plug}
            key={index}
          >
            <li
              className={`${
                view === "list"
                  ? "plugin-item-list list-group-item"
                  : "plugin-item-gallery li-gallery card"
              } ${
                (searchBoxValue === "" ||
                  plug["name"].toLowerCase().includes(searchBoxValue)) &&
                (typeFilterValue === "" || plug["type"] === typeFilterValue) &&
                (manuFilterValue === "" || plug["company"] === manuFilterValue)
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
                  src={plug["src"]}
                  alt={plug["name"]}
                />
                <div
                  className={
                    view === "list"
                      ? "name-and-company-container-list"
                      : "card-body"
                  }
                >
                  <span
                    className={
                      view === "list"
                        ? "plugin-name-list"
                        : "plugin-name-gallery"
                    }
                  >
                    {plug["name"]}
                  </span>
                  <span
                    className={
                      view === "gallery"
                        ? "d-none"
                        : "company-and-type-container-list"
                    }
                  >
                    <span title="company">{plug["company"]}</span>
                    <span id="company-and-type-dash-list">{" - "}</span>
                    <span className="type-list" title="type">
                      {plug["type"]}
                    </span>
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
          </Link>
        ))}
      </ul>
      <span id="none-found-message">
        Nothing to see here, try another search query.
      </span>
    </>
  );
};

export default List;
