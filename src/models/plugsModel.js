import {
  insertNewPlug,
  selectAllPlugs,
} from "../dataAccess/plugsDataAccess.js";

export default class Plug {
  createPlug = (company, name, src, type, userId) => {
    return insertNewPlug(company, name, src, type, userId);
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };
}
