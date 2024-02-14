import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { body, validationResult } from "express-validator";
import User from "../models/usersModel.js";

const userInstance = new User();
const secretKey = crypto.randomBytes(64).toString("hex");

const emailExists = async (email) => {
  const users = await userInstance.getAllUsers();

  return users.some((user) => user.email === email);
};

const validateAndSanitizeUserInput = async (req) => {
  await Promise.all(
    [
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid email format")
        .trim()
        .escape(),
      body("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .trim()
        .escape(),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim()
        .escape(),
    ].map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map((error) => {
      return error.msg;
    });

    throw errorsArray;
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcryptjs.compare(plainPassword, hashedPassword);

    return result;
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err;
  }
};

const generateUserToken = (userId) => {
  return jwt.sign({ userId: userId }, secretKey, { expiresIn: "1h" });
};

const createUser = async (email, name, password) => {
  return await userInstance.createUser(email, name, password);
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);

    return decodedToken.userId;
  } catch (error) {
    return error;
  }
};

const getUser = async (factor, identifier) => {
  return await userInstance.getUser(factor, identifier);
};

export default {
  emailExists,
  validateAndSanitizeUserInput,
  hashPassword,
  comparePasswords,
  createUser,
  generateUserToken,
  getUserIdFromToken,
  getUser,
};
