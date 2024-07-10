import dbActions from "../config/dbConfig.js";
import { selectPlug } from "../dataAccess/plugsDataAccess.js";

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

const addUserFavorite = async (userId, plugId) => {
  try {
    let newFavorites = [];
    const newFavorite = { plugId: plugId };
    const oldFavorites = await selectFavoritePlugs(userId);
    const query = `UPDATE users SET favorites = ? WHERE id = ?;`;

    oldFavorites.forEach((oldFavorite) => {
      newFavorites.push({ plugId: "" + oldFavorite.id });
    });

    newFavorites.push(newFavorite);

    await dbActions.executeQuery(query, [
      JSON.stringify(newFavorites),
      +userId,
    ]);
  } catch (error) {
    throw error;
  }
};

const addUserSaved = async (userId, plugId) => {
  try {
    let newSaves = [];
    const newSaved = { plugId: plugId };
    const oldSaves = await selectSavedPlugs(userId);
    const query = `UPDATE users SET saved = ? WHERE id = ?;`;

    oldSaves.forEach((oldSaved) => {
      newSaves.push({ plugId: "" + oldSaved.id });
    });

    newSaves.push(newSaved);

    await dbActions.executeQuery(query, [JSON.stringify(newSaves), +userId]);
  } catch (error) {
    throw error;
  }
};

const removeUserFavorite = async (userId, plugId) => {
  try {
    let newFavorites = [];
    const oldFavorites = await selectFavoritePlugs(userId);
    const query = `UPDATE users SET favorites = ? WHERE id = ?;`;

    oldFavorites.forEach((oldFavorite) => {
      if (oldFavorite.id != plugId)
        newFavorites.push({ plugId: "" + oldFavorite.id });
    });

    await dbActions.executeQuery(query, [
      JSON.stringify(newFavorites),
      +userId,
    ]);
  } catch (error) {
    throw error;
  }
};

const removeUserSaved = async (userId, plugId) => {
  try {
    let newSaves = [];
    const oldsaves = await selectSavedPlugs(userId);
    const query = `UPDATE users SET saved = ? WHERE id = ?;`;

    oldsaves.forEach((oldSaved) => {
      if (oldSaved.id != plugId) newSaves.push({ plugId: "" + oldSaved.id });
    });

    await dbActions.executeQuery(query, [JSON.stringify(newSaves), +userId]);
  } catch (error) {
    throw error;
  }
};

const selectFavoritePlugs = async (userId) => {
  const query = "SELECT favorites FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    let fullFavoritedPlugs = [];
    let toBeRemoved = [];

    if (results[0]["favorites"]) {
      for (let item of results[0]["favorites"]) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullFavoritedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    // remove deleted plugs from user's lists
    toBeRemoved.forEach(async (item) => {
      await removeUserFavorite(item.userId, item.plugId);
    });

    return fullFavoritedPlugs;
  } catch (error) {
    throw error;
  }
};

const selectSavedPlugs = async (userId) => {
  const query = "SELECT saved FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    let fullSavedPlugs = [];
    let toBeRemoved = [];

    if (results[0]["saved"]) {
      for (let item of results[0]["saved"]) {
        const plugDetails = await selectPlug("id", item["plugId"]);
        plugDetails
          ? fullSavedPlugs.push(plugDetails)
          : toBeRemoved.push({ userId: userId, plugId: item["plugId"] });
      }
    }

    // remove deleted plugs from user's lists
    toBeRemoved.forEach(async (item) => {
      await removeUserSaved(item.userId, item.plugId);
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
  addUserFavorite,
  removeUserFavorite,
  addUserSaved,
  removeUserSaved,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
};
