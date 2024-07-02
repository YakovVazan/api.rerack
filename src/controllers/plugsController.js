import AiService from "../services/AiService.js";
import JwtServices from "../services/JwtServices.js";
import plugsServices from "../services/plugsServices.js";

const createPlug = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const { company, name, src, type } = req.body;

  const anotherPlug = await plugsServices.getPlug("name", name);
  if (anotherPlug && anotherPlug["name"] === name) {
    return res
      .status(409)
      .json({ msg: "Plug with the same name already exists" });
  }

  const userId = JwtServices.getUserIdFromToken(token);
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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { company, name, src, type } = req.body;

  const anotherPlug = await plugsServices.getPlug("name", name);
  if (anotherPlug && anotherPlug["name"] === name) {
    return res
      .status(409)
      .json({ msg: "Plug with the same name already exists" });
  }

  const userId = JwtServices.getUserIdFromToken(token);
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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { needsToBeAdded } = req.body;
  const userId = JwtServices.getUserIdFromToken(token);

  if (needsToBeAdded) {
    await plugsServices.favorPlug(userId, plugId);
    res.status(200).json({ msg: "Plug added to wishlist" });
  } else {
    await plugsServices.unfavorPlug(userId, plugId);
    res.status(200).json({ msg: "Plug removed from wishlist" });
  }
};

const savePlug = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  const plugId = req.params.id;
  const { needsToBeAdded } = req.body;
  const userId = JwtServices.getUserIdFromToken(token);

  if (needsToBeAdded) {
    await plugsServices.savePlug(userId, plugId);
    res.status(200).json({ msg: "Plug saved" });
  } else {
    await plugsServices.unsavePlug(userId, plugId);
    res.status(200).json({ msg: "Plug unsaved" });
  }
};

const generateDescription = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  const verifyToken = JwtServices.verifyToken(token);
  if (verifyToken === "Invalid token" || !verifyToken.isOwner) {
    return res.status(403).json({ msg: "Unauthorized" });
  }

  const plugId = req.params.id;
  const userId = JwtServices.getUserIdFromToken(token);
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
