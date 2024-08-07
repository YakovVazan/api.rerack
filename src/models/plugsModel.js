import { deleteSaved, insertSaved } from "../dao/savedDao.js";
import { deleteFavorite, insertFavorite } from "../dao/favoritesDao.js";
import {
  insertNewPlug,
  selectPlug,
  selectAllPlugs,
  alterPlug,
  dropPlug,
} from "../dao/plugsDao.js";

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
    return insertFavorite(plugId, userId);
  };

  unfavorPlug = (userId, plugId) => {
    return deleteFavorite(plugId, userId);
  };

  savePlug = (userId, plugId) => {
    return insertSaved(plugId, userId);
  };

  unsavePlug = (userId, plugId) => {
    return deleteSaved(plugId, userId);
  };

  deletePlug = (userId, plugId) => {
    return dropPlug(userId, plugId);
  };
}
