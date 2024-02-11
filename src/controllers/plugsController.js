import Plug from "../models/plugsModel.js";

const plugInstance = new Plug();

const createPlug = (req, res) => {
  const { company, name, src, type } = req.body;
  const newPlug = plugInstance.createPlug(company, name, src, type);

  res.status(201).json(newPlug);
};

const getAllPlugs = async (req, res) => {
  try {
    const plugs = await plugInstance.getAllPlugs();
    
    res.json(plugs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { createPlug, getAllPlugs };
