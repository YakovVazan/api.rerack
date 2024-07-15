import {
  selectUserContributions,
  selectAllUsersContributions,
} from "../dao/contributionsDao.js";
import {
  insertNewUser,
  selectUser,
  alterHash,
  alterUser,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
} from "../dao/usersDao.js";

export default class User {
  createUser = async (email, name, hash) => {
    return await insertNewUser({ email: email, name: name, hash: hash });
  };

  getUser = async (factor, identifier) => {
    return await selectUser(factor, identifier);
  };

  resetPassword = async (email, newHash) => {
    return await alterHash(email, newHash);
  };

  updateUser = async (id, name, email, hash, isVerified) => {
    return await alterUser(id, name, email, hash, isVerified);
  };

  getUserContributions = async (userId) => {
    return await selectUserContributions(userId);
  };

  getAllUsersContributions = async () => {
    return await selectAllUsersContributions();
  };

  getFavoritePlugs = async (userId) => {
    return await selectFavoritePlugs(userId);
  };

  getSavedPlugs = async (userId) => {
    return await selectSavedPlugs(userId);
  };

  getAllUsers = async () => {
    return await selectAllUsers();
  };

  deleteUser = async (userId) => {
    return await dropUser(userId);
  };
}
