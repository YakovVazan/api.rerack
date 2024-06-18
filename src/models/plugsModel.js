import {
  insertNewPlug,
  selectAllPlugs,
  alterPlug,
  dropPlug,
} from "../dataAccess/plugsDataAccess.js";
import {
  updateUserFavorites,
  updateUserSaved,
} from "../dataAccess/usersDataAccess.js";

export default class Plug {
  createPlug = (company, name, src, type, userId) => {
    return insertNewPlug({
      company: company,
      name: name,
      src: src,
      type: type,
      userId: userId,
    });
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };

  setPlug = (plugId, company, name, src, type, userId) => {
    return alterPlug(plugId, {
      company: company,
      name: name,
      src: src,
      type: type,
      userId: userId,
    });
  };

  favorePlug = (userId, plugId) => {
    return updateUserFavorites(userId, plugId);
  };

  savePlug = (userId, plugId) => {
    return updateUserSaved(userId, plugId);
  };

  deletePlug = (id) => {
    return dropPlug(id);
  };
}
