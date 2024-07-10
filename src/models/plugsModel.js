import {
  insertNewPlug,
  selectPlug,
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
    return await insertNewPlug(company, name, src, type, userId);
  };

  getPlug = async (factor, identifier) => {
    return await selectPlug(factor, identifier);
  };

  getAllPlugs = () => {
    return selectAllPlugs();
  };

  setPlug = (plugId, company, name, src, type, userId) => {
    return alterPlug(plugId, company, name, src, type, userId);
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

  deletePlug = (userId, plugId) => {
    return dropPlug(userId, plugId);
  };
}
