import dbActions from "../config/dbConfig.js";

const validColumnNames = ["type", "time", "userId", "plugId"];

const selectUserContributions = async (userId) => {
  try {
    const query = `
        SELECT c.*, p.name as plugName
        FROM contributions c
        JOIN plugins p ON c.plugId = p.id
        WHERE c.userId = ?
    `;

    return await dbActions.executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectAllUsersContributions = async () => {
  try {
    const query = "SELECT * FROM contributions";

    return await dbActions.executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const insertContribution = async (type, plugName, plugId, userId) => {
  try {
    const query = `
        INSERT INTO contributions (type, time, plugName, plugId, userId)
        VALUES (?, ?, ?, ?, ?)
    `;

    return await dbActions.executeQuery(query, [
      type,
      new Date(),
      plugName,
      plugId,
      userId,
    ]);
  } catch (error) {
    throw error;
  }
};

const deleteContribution = async (column, value) => {
  if (!validColumnNames.includes(column)) {
    throw new Error("Invalid column name");
  }

  const query = `DELETE FROM contributions WHERE ${column} = ?`;
  try {
    await dbActions.executeQuery(query, [value]);
  } catch (error) {
    throw error;
  }
};

export {
  selectUserContributions,
  selectAllUsersContributions,
  insertContribution,
  deleteContribution,
};
