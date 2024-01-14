import { useLocation, useParams, Navigate } from "react-router-dom";
import plugsNames from "../../../assets/Data/PlugsNames.jsx";
import "./ListItem.css";

const ListItem = () => {
  const { name } = useParams();
  const location = useLocation();
  const { state } = location;

  return (
    <>
      {plugsNames.includes(name) ? (
        <div className="list-item-container">
          <div className="card list-item">
            <img
              src={state["src"]}
              className="card-img-top"
              alt={state["name"]}
            />
            <div className="card-body">
              <h1 className="card-title">{state["name"]}</h1>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/not-found"} />
      )}
    </>
  );
};

export default ListItem;
