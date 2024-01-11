import { useLocation } from "react-router-dom";
import "./ListItem.css";

const ListItem = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <>
      <div className="list-item-container">
      <div className="card">
        <img src={state["src"]} className="card-img-top" alt={state["name"]} />
        <div className="card-body">
          <h1 className="card-title">{state["name"]}</h1>
        </div>
      </div>
      </div>
    </>
  );
};

export default ListItem;
