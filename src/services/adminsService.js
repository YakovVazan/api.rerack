import Admin from "../models/adminsModel.js";

const adminInstance = new Admin();

const addAdmin = async (userId, email) => {
  return await adminInstance.addAdmin(userId, email);
};

const deleteAdmin = async (userId) => {
  return await adminInstance.deleteAdmin(userId);
};

export default { addAdmin, deleteAdmin };
