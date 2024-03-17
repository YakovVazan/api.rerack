import {
  insertNewUser,
  selectUser,
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

  getAllUsers = () => {
    return selectAllUsers();
  };

  deleteUser = (userId) => {
    return dropUser(userId);
  };
}
