import dbActions from "../config/dbConfig.js";

const insertFavorite = async (plugId, userId) => {
  try {
    const query = `
          INSERT INTO favorites (plugId, userId)
          VALUES (?, ?)
      `;

    return await dbActions.executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

const selectUserFavorites = async (userId) => {
  try {
    const query = `SELECT * FROM favorites WHERE userId = ?`;
    return await dbActions.executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const deleteFavorite = async (plugId, userId) => {
  try {
    const query = `DELETE FROM favorites WHERE plugId =? AND userId =?`;
    return await dbActions.executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

export { insertFavorite, selectUserFavorites, deleteFavorite };
