import { Fragment, useContext, useEffect } from "react";
import ListItem from "../ListItem/ListItem.jsx";
import ListHeader from "../ListHeader/ListHeader.jsx";
import Context from "../../../assets/Context/Context.jsx";
import "./List.css";

const List = () => {
  const data = useContext(Context);
  const orderedData = data["orderedData"];
  const view = data["view"];

  const initials = Array.from(
    new Set(
      orderedData.map((piece) => {
        if (data["orderBy"] === "name") {
          return piece["name"][0];
        } else {
          return piece[data["orderBy"]];
        }
      })
    )
  );

  let currentInitial = initials[0];
  let previousInitial = currentInitial;

  // control 'no plugs found' message
  useEffect(() => {
    const hiddenElements = Array.from(
      document.querySelectorAll(".d-none")
    ).length;

    if (
      (view === "list" && hiddenElements == orderedData.length) ||
      (view === "gallery" && hiddenElements == orderedData.length * 2)
    ) {
      document.querySelector("#none-found-message").style.display = "block";
    } else {
      document.querySelector("#none-found-message").style.display = "none";
    }
  });

  return (
    <>
      <ul
        id="items-container"
        className={view === "list" ? "list-group" : "ul-gallery"}
      >
        {orderedData.map((plug, index) => {
          const itsHeaderCompliance =
            (view === "list" &&
              data["orderBy"] === "name" &&
              plug["name"][0] === currentInitial) ||
            plug[data["orderBy"]] === currentInitial;

          if (itsHeaderCompliance) {
            // pick headers from initials array
            initials.shift();
            previousInitial = currentInitial;
            currentInitial = initials[0];

            return (
              <Fragment key={index}>
                <ListHeader previousInitial={previousInitial} />
                <ListItem plug={plug} index={index} />
              </Fragment>
            );
          } else {
            return <ListItem plug={plug} index={index} key={index} />;
          }
        })}
      </ul>
      <span id="none-found-message">
        Nothing to see here, try another search query.
      </span>
    </>
  );
};

export default List;
