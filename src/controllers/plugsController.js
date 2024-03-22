import plugsServices from "../services/plugsServices.js";
import JwtServices from "../services/JwtServices.js";
import AiService from "../services/AiService.js";

const createPlug = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }


  const { company, name, src, type } = req.body;
  const userId = JwtServices.getUserIdFromToken(token);
  const newPlug = plugsServices.createPlug(company, name, src, type, userId);

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
  const userId = JwtServices.getUserIdFromToken(token);
  const editedPlug = plugsServices.updatePlug(plugId, company, name, src, type, userId);

  res.status(201).json(editedPlug);
}

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
    const generatedDescription = await AiService.askGemini(name, type, company)

    res.status(201).json({msg: generatedDescription});
  } catch (error) {
    res.status(403).json({ msg: error });
  }
}

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
  const deletedPlug = plugsServices.deletePlug(plugId);

  res.status(201).json(deletedPlug);
}

export default { createPlug, getAllPlugs, updatePlug, generateDescription, deletePlug };
