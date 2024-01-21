import { useContext } from "react";
import Data from "../../../../assets/Data/Data.jsx";
import Context from "../../../../assets/Context/Context.jsx";
import { ResetCompanyValue } from "../../../../assets/ResetFactors/ResetFactors.jsx";
import "./CompanyDropDown.css";

const TypeDropDown = () => {
  const setCompanyFilterValue = useContext(Context)["setCompanyFilterValue"];
  const CompanysList = [...new Set(Data.map((plug) => plug.company))];

  function handleClick(companyName) {
    ResetCompanyValue(companyName);

    setCompanyFilterValue(companyName);
  }

  return (
    <>
      <div
        className="dropdown-center search-button-container"
        title="company"
      >
        <button
          id="company-filter"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="inner-button-text-company">company</span>
        </button>
        {/* filter drop down */}
        <ul className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleClick("")}>
            all
          </div>
          <hr className="dropdown-divider"></hr>
          {CompanysList.map((company, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(company)}
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TypeDropDown;
