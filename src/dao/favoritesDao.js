import { executeQuery } from "../config/dbConfig.js";

const insertFavorite = async (plugId, userId) => {
  const query = `
    INSERT INTO favorites ("plugId", "userId")
    VALUES ($1, $2)
  `;
  try {
    return await executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

const selectUserFavorites = async (userId) => {
  const query = `SELECT * FROM favorites WHERE "userId" = $1`;
  try {
    return await executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectAllFavorites = async () => {
  const query = `SELECT * FROM favorites`;
  try {
    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const deleteFavorite = async (plugId, userId) => {
  const query = `DELETE FROM favorites WHERE "plugId" = $1 AND "userId" = $2`;
  try {
    return await executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

export {
  insertFavorite,
  selectUserFavorites,
  selectAllFavorites,
  deleteFavorite,
};
