import { selectPlug } from "../dao/plugsDao.js";
import { executeQuery } from "../config/dbConfig.js";
import { deleteSaved, selectUserSaved } from "./savedDao.js";
import { deleteFavorite, selectUserFavorites } from "./favoritesDao.js";

const insertNewUser = async (data) => {
  const query = `
    INSERT INTO users ("name", "email", "hash", "isVerified")
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  try {
    const result = await executeQuery(query, [
      data.name,
      data.email,
      data.hash,
      data.isVerified,
    ]);
    return result[0].id;
  } catch (error) {
    throw error;
  }
};

const selectUser = async (factor, identifier) => {
  const query = `SELECT * FROM users WHERE "${factor}" = $1`;
  try {
    const result = await executeQuery(query, [identifier]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const alterHash = async (email, newHash) => {
  const query = `UPDATE users SET "hash" = $1 WHERE "email" = $2`;
  try {
    return await executeQuery(query, [newHash, email]);
  } catch (error) {
    throw error;
  }
};

const alterUser = async (id, name, email, hash, isVerified) => {
  const query = `
    UPDATE users SET "name" = $1, "email" = $2, "hash" = $3, "isVerified" = $4 
    WHERE "id" = $5
  `;
  try {
    await executeQuery(query, [name, email, hash, isVerified, id]);
    return selectUser("id", id);
  } catch (error) {
    throw error;
  }
};

const selectFavoritePlugs = async (userId) => {
  try {
    const userFavorites = await selectUserFavorites(userId);
    let fullFavoritedPlugs = [];
    let toBeRemoved = [];

    if (userFavorites) {
      for (let item of userFavorites) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullFavoritedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    toBeRemoved.forEach(async (item) => {
      await deleteFavorite(item.plugId, item.userId);
    });

    return fullFavoritedPlugs;
  } catch (error) {
    throw error;
  }
};

const selectSavedPlugs = async (userId) => {
  try {
    const userSaved = await selectUserSaved(userId);
    let fullSavedPlugs = [];
    let toBeRemoved = [];

    if (userSaved) {
      for (let item of userSaved) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullSavedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    toBeRemoved.forEach(async (item) => {
      await deleteSaved(item.plugId, item.userId);
    });

    return fullSavedPlugs;
  } catch (error) {
    throw error;
  }
};

const selectAllUsers = async () => {
  const query = "SELECT * FROM users";
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const dropUser = async (id) => {
  const query = `DELETE FROM users WHERE "id" = $1`;
  try {
    await executeQuery(query, [id]);
  } catch (error) {
    throw error;
  }
};

export {
  insertNewUser,
  selectUser,
  alterHash,
  alterUser,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
};
