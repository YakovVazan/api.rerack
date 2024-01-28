import { insertNewPlug, selectAllPlugs } from "../dataAccess/dbDataAccess.js";

export default class Plug {
  createPlug = (company, name, src, type) => {
    return insertNewPlug(company, name, src, type);
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };
}
