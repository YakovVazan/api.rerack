import { deleteAdmin, insertAmdin } from "../dao/adminsDao.js";

export default class Admin {
  addAdmin = async (email, userId) => {
    return await insertAmdin(email, userId);
  };

  deleteAdmin = async (userId) => {
    return await deleteAdmin(userId);
  };
}
