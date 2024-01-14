import { useContext, useEffect } from "react";
import Context from "../../../../assets/Context/Context";
import SortData from "../../../../assets/Data/SortData"; //////////////////////////////////////////////////////////

const Filter = () => {
  const data = useContext(Context);

  function handleClick(query) {
    data["setOrderedData"](SortData(query));
  }

  // set initial sort by name
  useEffect(() => {
    handleClick("");
  }, []);

  return (
    <>
      <div
        className="btn btn-outline-secondary"
        data-bs-toggle="dropdown"
        title="filter A-Z"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-funnel"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
        </svg>
      </div>

      {/* filter drop down */}
      <ul className="dropdown-menu">
        <li className="dropdown-item" onClick={() => handleClick("name")}>
          Name
        </li>
        <li className="dropdown-item" onClick={() => handleClick("type")}>
          Type
        </li>
        <li className="dropdown-item" onClick={() => handleClick("company")}>
          company
        </li>
      </ul>
    </>
  );
};

export default Filter;
