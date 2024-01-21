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

  // useEffect(() => {
  //   const factor =
  //     data["orderBy"] === "name"
  //       ? ".plugin-name-list"
  //       : `.${data["orderBy"]}-list`;

  //   console.log(
  //     Array.from(
  //       new Set(
  //         Array.from(document.querySelectorAll(factor)).map((element) => {
  //           return factor === ".plugin-name-list"
  //             ? element.textContent[0]
  //             : element.textContent;
  //         })
  //       )
  //     )
  //   );
  // });

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
      document.querySelector("#items-container").style.display = "none";
      document.querySelector("#none-found-message").style.display = "block";
    } else {
      document.querySelector("#none-found-message").style.display = "none";
      document.querySelector("#items-container").style.display = "block";
    }
  });

  return (
    <>
      <ul
        id="items-container"
        className={view === "list" ? "list-group" : "ul-gallery"}
      >
        {orderedData.map((plug, index) => {
          console.log(data);
          const itsHeaderCompliance =
            data["searchBoxValue"] === "" &&
            data["companyFilterValue"] === "" &&
            data["typeFilterValue"] === "" &&
            view === "list" &&
            ((data["orderBy"] === "name" &&
              plug["name"][0] === currentInitial) ||
              plug[data["orderBy"]] === currentInitial);

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
