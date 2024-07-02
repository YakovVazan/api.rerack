import Plug from "../models/plugsModel.js";

const plugInstance = new Plug();

const createPlug = async (company, name, src, type, userId) => {
  return await plugInstance.createPlug(company, name, src, type, userId);
};

const getPlug = async (factor, identifier) => {
  return await plugInstance.getPlug(factor, identifier);
};

const getAllPlugs = async () => {
  return await plugInstance.getAllPlugs();
};

const updatePlug = (plugId, company, name, src, type, userId) => {
  return plugInstance.setPlug(plugId, company, name, src, type, userId);
};

const favorPlug = (userId, plugId) => {
  return plugInstance.favorPlug(userId, plugId);
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
  getPlug,
  getAllPlugs,
  updatePlug,
  favorPlug,
  unfavorPlug,
  savePlug,
  unsavePlug,
  deletePlug,
};
