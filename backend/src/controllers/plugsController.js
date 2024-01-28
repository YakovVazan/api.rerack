import plugsModel from "../models/plugsModel.js";

const createPlug = (req, res) => {
  const { company, name, src, type } = req.body;
  const newPlug = plugsModel.createPlug(company, name, src, type);
  //   res.status(201).json(newPlug);
};

const getAllPlugs = (req, res) => {
  const plugs = plugsModel.getAllPlugs();
  //   res.json(plugs);
};

export default { createPlug, getAllPlugs };
