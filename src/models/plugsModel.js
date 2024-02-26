import {
  insertNewPlug,
  selectAllPlugs,
  alterPlug,
  dropPlug,
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

  deletePlug = (id) => {
    return dropPlug(id);
  }
}
