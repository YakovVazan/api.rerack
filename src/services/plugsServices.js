import Plug from "../models/plugsModel.js";

const plugInstance = new Plug();

const createPlug = (company, name, src, type, userId) => {
  return plugInstance.createPlug(company, name, src, type, userId);
};

const getAllPlugs = async () => {
  return await plugInstance.getAllPlugs();
};

export default { createPlug, getAllPlugs };
