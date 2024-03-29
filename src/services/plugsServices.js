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
}

const deletePlug = (plugId) => {
  return plugInstance.deletePlug(plugId);
}

export default { createPlug, getAllPlugs, updatePlug, deletePlug };
