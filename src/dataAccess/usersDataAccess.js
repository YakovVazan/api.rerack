import dbActions from "../config/dbConfig.js";
import { selectPlug } from "../dataAccess/plugsDataAccess.js";
import { deleteSaved, selectUserSaved } from "./savedDataAccess.js";
import { deleteFavorite, selectUserFavorites } from "./favoritesDataAccess.js";

const insertNewUser = async (data) => {
  const query = "INSERT INTO users SET ?";
  try {
    const result = await dbActions.executeQuery(query, data);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const selectUser = async (factor, identifier) => {
  const query = `SELECT * FROM users WHERE ${factor} = ?`;
  try {
    const [result] = await dbActions.executeQuery(query, [identifier]);
    return result;
  } catch (error) {
    throw error;
  }
};

const alterHash = async (email, newHash) => {
  const query = "UPDATE users SET hash =? WHERE email =?";
  try {
    return await dbActions.executeQuery(query, [newHash, email]);
  } catch (error) {
    throw error;
  }
};

const alterUser = async (id, name, email, hash, isVerified) => {
  const query =
    "UPDATE users SET name =?, email =?, hash =?, isVerified =? WHERE id =?";
  try {
    await dbActions.executeQuery(query, [name, email, hash, isVerified, id]);
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

    // detect deleted plugins in favorites
    if (userFavorites) {
      for (let item of userFavorites) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullFavoritedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    // remove deleted plugs from user's lists
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

    // detect deleted plugins in saved
    if (userSaved) {
      for (let item of userSaved) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullSavedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    // remove deleted plugs from user's lists
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
    const results = await dbActions.executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const dropUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  try {
    await dbActions.executeQuery(query, [id]);
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
