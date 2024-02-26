import {
  insertNewPlug,
  selectAllPlugs,
  alterPlug,
} from "../dataAccess/plugsDataAccess.js";

export default class Plug {
  createPlug = (company, name, src, type, userId) => {
    return insertNewPlug(company, name, src, type, userId);
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };

  setPlug = (company, name, src, type, userId) => {
    return alterPlug(company, name, src, type, userId);
  }
}
