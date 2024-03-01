import {
  insertNewUser,
  selectUser,
  selectAllUsers,
  dropUser,
} from "../dataAccess/usersDataAccess.js";

export default class User {
  createUser = (company, name, hash) => {
    return insertNewUser({ company: company, name: name, hash: hash });
  };

  getUser = (factor, identifier) => {
    return selectUser(factor, identifier);
  };

  getAllUsers = () => {
    return selectAllUsers();
  };

  deleteUser = (userId) => {
    return dropUser(userId);
  };
}
