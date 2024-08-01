import { executeQuery } from "../config/dbConfig.js";

const insertSaved = async (plugId, userId) => {
  const query = `
    INSERT INTO saved ("plugId", "userId")
    VALUES ($1, $2)
  `;
  try {
    return await executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

const selectUserSaved = async (userId) => {
  const query = `
    SELECT * FROM saved WHERE "userId" = $1
  `;
  try {
    return await executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectAllSaved = async () => {
  const query = "SELECT * FROM saved";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const deleteSaved = async (plugId, userId) => {
  const query = `
    DELETE FROM saved WHERE "plugId" = $1 AND "userId" = $2
  `;
  try {
    return await executeQuery(query, [plugId, userId]);
  } catch (error) {
    throw error;
  }
};

export { insertSaved, selectUserSaved, selectAllSaved, deleteSaved };
