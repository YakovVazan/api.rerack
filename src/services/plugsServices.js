import { body, validationResult } from "express-validator";
import Plug from "../models/plugsModel.js";

const plugInstance = new Plug();
const validateAndSanitizePlugDetails = async (req) => {
  await Promise.all(
    [
      body("company")
        .isLength({ min: 1 })
        .withMessage("Company is required")
        .trim()
        .escape(),
      body("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .trim()
        .escape(),
      body("src")
        .isLength({ min: 1, max: 255 })
        .withMessage("Invalid URL format for img src")
        .trim(),
      body("type")
        .isLength({ min: 1 })
        .withMessage("Type is required")
        .trim()
        .escape(),
    ].map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map((error) => {
      return error.msg;
    });

    return errorsArray;
  }
};

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

const deletePlug = (userId, plugId) => {
  return plugInstance.deletePlug(userId, plugId);
};

export default {
  validateAndSanitizePlugDetails,
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
