import Plug from "../models/plugsModel.js";

const plugInstance = new Plug();

const createPlug = (company, name, src, type, userId) => {
  return plugInstance.createPlug(company, name, src, type, userId);
};

const getAllPlugs = async () => {
  return await plugInstance.getAllPlugs();
};

const updatePlug = (plugId, company, name, src, type, userId) => {
  return plugInstance.setPlug(plugId, company, name, src, type, userId);
};

const favorePlug = (userId, plugId) => {
  return plugInstance.favorePlug(userId, plugId);
};

const unfavorPlug = (userId, plugId) => {
  return plugInstance.unfavorPlug(userId, plugId);
};

const savePlug = (userId, plugId) => {
  return plugInstance.savePlug(userId, plugId);
};

const unsavePlug = (userId, plugId) => {
  return plugInstance.unsavePlug(userId, plugId);
};

const deletePlug = (plugId) => {
  return plugInstance.deletePlug(plugId);
};

export default {
  createPlug,
  getAllPlugs,
  updatePlug,
  favorePlug,
  unfavorPlug,
  savePlug,
  unsavePlug,
  deletePlug,
};
