import {
  insertNewPlug,
  selectAllPlugs,
  alterPlug,
  dropPlug,
} from "../dataAccess/plugsDataAccess.js";

export default class Plug {
  createPlug = (company, name, src, type, userId) => {
    return insertNewPlug({ company: company, name: name, src: src, type: type, userId: userId });
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };

  setPlug = (plugId, company, name, src, type, userId) => {
    return alterPlug(plugId, { company: company, name: name, src: src, type: type, userId: userId });
  }

  deletePlug = (id) => {
    return dropPlug(id);
  }
}
