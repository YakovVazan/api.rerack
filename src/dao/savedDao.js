import dbActions from "../config/dbConfig.js";

const insertSaved = async (plugId, userId) => {
  try {
    const query = `
          INSERT INTO saved (plugId, userId)
          VALUES (?, ?)
      `;

    return await dbActions.executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

const selectUserSaved = async (userId) => {
  try {
    const query = `SELECT * FROM saved WHERE userId = ?`;
    return await dbActions.executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectAllSaved = async () => {
  try {
    const query = "SELECT * FROM saved";
    return await dbActions.executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const deleteSaved = async (plugId, userId) => {
  try {
    const query = `DELETE FROM saved WHERE plugId =? AND userId =?`;
    return await dbActions.executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

export { insertSaved, selectUserSaved, selectAllSaved, deleteSaved };
