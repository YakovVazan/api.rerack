import dbActions from "../config/dbConfig.js";

const validColumnNames = ["*", "email_address", "userId"];

const selectAllAdmins = async (column = "*") => {
  if (!validColumnNames.includes(column)) {
    throw new Error("Invalid column name");
  }

  try {
    const query = `SELECT ${column} FROM admins`;

    return await dbActions.executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const insertAmdin = async (userId, email) => {
  try {
    const query = `INSERT INTO admins (email_address, userId) VALUES (?, ?)`;

    return await dbActions.executeQuery(query, [email, userId]);
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (userId) => {
  const query = `DELETE FROM admins WHERE userId = ?`;
  try {
    return await dbActions.executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

export { selectAllAdmins, insertAmdin, deleteAdmin };
