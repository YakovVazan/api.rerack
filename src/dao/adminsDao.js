import { executeQuery } from "../config/dbConfig.js";

const validColumnNames = ["*", "email_address", "userId"];

const selectAllAdmins = async (column = "*") => {
  if (!validColumnNames.includes(column)) {
    throw new Error("Invalid column name");
  }

  try {
    const query = `SELECT "${column}" FROM admins`;
    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const insertAdmin = async (userId, email) => {
  try {
    const query = `
      INSERT INTO admins ("email_address", "userId")
      VALUES ($1, $2)
      RETURNING *
    `;

    return await executeQuery(query, [email, userId]);
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (userId) => {
  const query = `DELETE FROM admins WHERE "userId" = $1`;
  try {
    return await executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

export { selectAllAdmins, insertAdmin, deleteAdmin };
