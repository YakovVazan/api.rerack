import {
  insertNewUser,
  selectUser,
  alterHash,
  alterUser,
  selectUserContributions,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
} from "../dataAccess/usersDataAccess.js";

export default class User {
  createUser = (email, name, hash) => {
    return insertNewUser({ email: email, name: name, hash: hash });
  };

  getUser = (factor, identifier) => {
    return selectUser(factor, identifier);
  };

  resetPassword = (email, newHash) => {
    return alterHash(email, newHash);
  }

  updateUser = (id, name, email, hash, isVerified) => {
    return alterUser(id, name, email, hash, isVerified);
  };

  getUserContributions = (userId) => {
    return selectUserContributions(userId);
  };

  getFavoritePlugs = (userId) => {
    return selectFavoritePlugs(userId);
  };

  getSavedPlugs = (userId) => {
    return selectSavedPlugs(userId);
  };

  getAllUsers = () => {
    return selectAllUsers();
  };

  deleteUser = (userId) => {
    return dropUser(userId);
  };
}
