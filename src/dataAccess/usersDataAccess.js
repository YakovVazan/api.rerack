import { selectPlug } from "../dataAccess/plugsDataAccess.js";
import dbActions from "../config/dbConfig.js";

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

const updateUserContribution = async (action, userId, plugId) => {
  try {
    let newContributions = [];
    const newAction = action;
    let alreadyContributedTo = false;
    const plugDetails = await selectPlug(plugId);
    let oldContributions = await selectUserContributions(userId);
    const query = `UPDATE users SET contributions = ? WHERE id = ?;`; // [{id: id, name: name, actions: ['action', 'action']}, {...}]

    // initialize the data
    oldContributions =
      oldContributions[0]["contributions"] === null
        ? []
        : oldContributions[0]["contributions"];

    oldContributions.forEach((oldContribution) => {
      if (oldContribution.id == plugId) {
        alreadyContributedTo = true;
        oldContribution.actions.push(action);
      }

      newContributions.push(oldContribution);
    });

    if (!alreadyContributedTo) {
      newContributions.push({
        id: plugDetails.id,
        name: plugDetails.name,
        actions: [newAction],
      });
    }

    await dbActions.executeQuery(query, [
      JSON.stringify(newContributions),
      +userId,
    ]);
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
    const oldSaves = await selectFavoritePlugs(userId);
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

const selectUserContributions = async (userId) => {
  try {
    const query = `SELECT contributions FROM users WHERE id = ?`; // [{id: id, name: name, actions: ['action', 'action']}, {...}]

    return await dbActions.executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectFavoritePlugs = async (userId) => {
  const query = "SELECT favorites FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    let savedPlugs = [];

    if (results[0]["favorites"]) {
      for (let item of results[0]["favorites"]) {
        savedPlugs.push(await selectPlug(item["plugId"]));
      }
    }

    return savedPlugs;
  } catch (error) {
    throw error;
  }
};

const selectSavedPlugs = async (userId) => {
  const query = "SELECT saved FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    let fullSavedPlugs = [];

    if (results[0]["saved"]) {
      for (let item of results[0]["saved"]) {
        fullSavedPlugs.push(await selectPlug(item["plugId"]));
      }
    }

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
  alterUser,
  addUserFavorite,
  removeUserFavorite,
  addUserSaved,
  removeUserSaved,
  updateUserContribution,
  selectUserContributions,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
};
