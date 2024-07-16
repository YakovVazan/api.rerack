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

export { selectAllAdmins };
