import {
  insertNewUser,
  selectUser,
  selectUserContributions,
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

  getUserContributions = (userId) => {
    return selectUserContributions(userId);
  };

  getAllUsers = () => {
    return selectAllUsers();
  };

  deleteUser = (userId) => {
    return dropUser(userId);
  };
}
