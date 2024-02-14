import {
  insertNewUser,
  selectUser,
  selectAllUsers,
} from "../dataAccess/usersDataAccess.js";

export default class User {
  createUser = (company, name, hash) => {
    return insertNewUser(company, name, hash);
  };

  getUser = (factor, identifier) => {
    return selectUser(factor, identifier);
  };

  getAllUsers = () => {
    return selectAllUsers();
  };
}
