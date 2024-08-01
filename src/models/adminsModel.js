import { deleteAdmin, insertAdmin } from "../dao/adminsDao.js";

export default class Admin {
  addAdmin = async (email, userId) => {
    return await insertAdmin(email, userId);
  };

  deleteAdmin = async (userId) => {
    return await deleteAdmin(userId);
  };
}
