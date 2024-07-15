import AiService from "../services/AiService.js";
import JwtServices from "../services/JwtServices.js";
import plugsServices from "../services/plugsServices.js";

const createPlug = async (req, res) => {
  if (JwtServices.verifyToken(req.token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const { company, name, src, type } = req.body;

  const anotherPlug = await plugsServices.getPlug("name", name);
  if (
    anotherPlug &&
    anotherPlug["name"].toLowerCase() === name.toLowerCase() &&
    anotherPlug["id"] != plugId
  ) {
    return res
      .status(409)
      .json({ msg: "Plug with the same name already exists" });
  }

  const userId = JwtServices.getUserIdFromToken(req.token);
  const newPlug = await plugsServices.createPlug(
    company,
    name,
    src,
    type,
    userId
  );

  res.status(201).json(newPlug);
};

const getAllPlugs = async (req, res) => {
  try {
    const plugs = await plugsServices.getAllPlugs();

    res.json(plugs);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updatePlug = async (req, res) => {
  if (JwtServices.verifyToken(req.token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { company, name, src, type } = req.body;

  const anotherPlug = await plugsServices.getPlug("name", name);
  if (
    anotherPlug &&
    anotherPlug["name"].toLowerCase() === name.toLowerCase() &&
    anotherPlug["id"] != plugId
  ) {
    return res
      .status(409)
      .json({ msg: "Plug with the same name already exists" });
  }

  const userId = JwtServices.getUserIdFromToken(req.token);
  const editedPlug = plugsServices.updatePlug(
    plugId,
    company,
    name,
    src,
    type,
    userId
  );

  res.status(201).json(editedPlug);
};

const favorPlug = async (req, res) => {
  if (JwtServices.verifyToken(req.token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { needsToBeAdded } = req.body;
  const userId = JwtServices.getUserIdFromToken(req.token);

  if (needsToBeAdded) {
    await plugsServices.favorPlug(userId, plugId);
    res.status(200).json({ msg: "favored" });// DO NOT CHANGE MSG CONTENT, THE FRONT IS RELYING ON IT
  } else {
    await plugsServices.unfavorPlug(userId, plugId);
    res.status(200).json({ msg: "unfavored" });// DO NOT CHANGE MSG CONTENT, THE FRONT IS RELYING ON IT
  }
};

const savePlug = async (req, res) => {
  if (JwtServices.verifyToken(req.token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { needsToBeAdded } = req.body;
  const userId = JwtServices.getUserIdFromToken(req.token);

  if (needsToBeAdded) {
    await plugsServices.savePlug(userId, plugId);
    res.status(200).json({ msg: "saved" });// DO NOT CHANGE MSG CONTENT, THE FRONT IS RELYING ON IT
  } else {
    await plugsServices.unsavePlug(userId, plugId);
    res.status(200).json({ msg: "unsaved" });// DO NOT CHANGE MSG CONTENT, THE FRONT IS RELYING ON IT
  }
};

const generateDescription = async (req, res) => {
  if (JwtServices.verifyToken(req.token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const { company, name, type } = req.body;

  try {
    const generatedDescription = await AiService.askGemini(name, type, company);

    res.status(201).json({ msg: generatedDescription });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};

const deletePlug = async (req, res) => {
  const verifyToken = JwtServices.verifyToken(req.token);
  if (verifyToken === "Invalid token" || !verifyToken.isOwner) {
    return res.status(403).json({ msg: "Unauthorized" });
  }

  const plugId = req.params.id;
  const userId = JwtServices.getUserIdFromToken(req.token);
  const deletedPlug = plugsServices.deletePlug(userId, plugId);

  res.status(201).json(deletedPlug);
};

export default {
  createPlug,
  getAllPlugs,
  updatePlug,
  favorPlug,
  savePlug,
  generateDescription,
  deletePlug,
};
