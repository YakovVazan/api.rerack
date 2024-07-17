import bcryptjs from "bcryptjs";
import { body, validationResult } from "express-validator";
import User from "../models/usersModel.js";
import { selectAllAdmins } from "../dao/adminsDao.js";
import { selectAllOwners } from "../dao/ownersDao.js";

const userInstance = new User();

const emailExists = async (email) => {
  const users = await getAllUsers();

  return users.some((user) => user.email === email);
};

const validateAndSanitizeUserRegistration = async (req) => {
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

const createUser = async (email, name, password) => {
  return await userInstance.createUser(email, name, password);
};

const getUser = async (factor, identifier) => {
  return await userInstance.getUser(factor, identifier);
};

const resetPassword = async (email, newHash) => {
  return await userInstance.resetPassword(email, newHash);
};

const updateUser = async (id, name, email, hash, isVerified) => {
  return await userInstance.updateUser(id, name, email, hash, isVerified);
};

const getUserContributions = async (userId) => {
  return await userInstance.getUserContributions(userId);
};

const getAllUsersContributions = async () => {
  return await userInstance.getAllUsersContributions();
};

const getFavoritePlugs = async (userId) => {
  return await userInstance.getFavoritePlugs(userId);
};

const getSavedPlugs = async (userId) => {
  return await userInstance.getSavedPlugs(userId);
};

const getAllUsers = async () => {
  const users = await userInstance.getAllUsers();
  const adminsIds = (await getAllAdmins("userId"))?.map(
    (admin) => admin.userId
  );
  const ownersIds = (await getAllOwners())?.map((owner) => owner.userId);

  for (const user of users) {
    user["isAdmin"] = adminsIds.includes(user.id);
    user["isOwner"] = ownersIds.includes(user.id);
  }

  return users;
};

const getAllAdmins = async (column) => {
  return await selectAllAdmins(column);
};

const getAllOwners = async () => {
  return await selectAllOwners();
};

const deleteUser = async (userId) => {
  const users = await getAllUsers();
  const userFound =
    Object.values(users).filter((user) => user.id === parseInt(userId))
      .length !== 0;

  if (!userFound) {
    return "No user found with that ID.";
  }

  return await userInstance.deleteUser(userId);
};

export default {
  emailExists,
  validateAndSanitizeUserRegistration,
  hashPassword,
  comparePasswords,
  createUser,
  getUser,
  resetPassword,
  updateUser,
  getUserContributions,
  getAllUsersContributions,
  getFavoritePlugs,
  getSavedPlugs,
  getAllUsers,
  getAllAdmins,
  getAllOwners,
  deleteUser,
};
