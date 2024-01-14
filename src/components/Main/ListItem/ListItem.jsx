import { useContext } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import Context from "../../../assets/Context/Context.jsx";
import "./ListItem.css";

const ListItem = () => {
  const { name } = useParams();
  const pluginsList = useContext(Context)["PluginData"];
  const pluginNames = pluginsList.map((plug) => plug.name.replace(/ /g, "_").toLowerCase());
  const location = useLocation();
  const { state } = location;

  return (
    <>
      {pluginNames.includes(name) ? (
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
