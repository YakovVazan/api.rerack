import {
  insertNewPlug,
  selectAllPlugs,
  alterPlug,
  dropPlug,
} from "../dataAccess/plugsDataAccess.js";
import {
  addUserFavorite,
  removeUserFavorite,
  addUserSaved,
  removeUserSaved,
} from "../dataAccess/usersDataAccess.js";

export default class Plug {
  createPlug = async (company, name, src, type, userId) => {
    return await insertNewPlug({
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

  favorPlug = (userId, plugId) => {
    return addUserFavorite(userId, plugId);
  };

  unfavorPlug = (userId, plugId) => {
    return removeUserFavorite(userId, plugId);
  };

  savePlug = (userId, plugId) => {
    return addUserSaved(userId, plugId);
  };

  unsavePlug = (userId, plugId) => {
    return removeUserSaved(userId, plugId);
  };

  deletePlug = (id) => {
    return dropPlug(id);
  };
}
