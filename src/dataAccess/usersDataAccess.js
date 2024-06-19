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
  const query = `UPDATE users
                  SET contributions = JSON_ARRAY_APPEND(IFNULL(contributions, '[]'), '$', JSON_OBJECT('action', ?, 'plugId', ?))
                  WHERE id = ?;`;
  try {
    await dbActions.executeQuery(query, [action, +plugId, +userId]);
  } catch (error) {
    throw error;
  }
};

const addUserFavorite = async (userId, plugId) => {
  const query = `UPDATE users
                  SET favorites = JSON_ARRAY_APPEND(IFNULL(favorites, '[]'), '$',JSON_OBJECT('plugId', ?))
                  WHERE id =?;`;
  try {
    await dbActions.executeQuery(query, [plugId, +userId]);
  } catch (error) {
    throw error;
  }
};

const removeUserFavorite = async (userId, plugId) => {
  const query = `UPDATE users SET favorites = ? WHERE id = ?;`;
  try {
    const favortiePlugs = await selectFavoritePlugs(userId);
    let favorties = JSON.parse(JSON.stringify(favortiePlugs[0]["favorites"])) || [];

    favorties = favorties.filter(
      (favortiePlug) => !(favortiePlug["plugId"] && favortiePlug["plugId"] === plugId)
    );

    const updatedFavorites = JSON.stringify(favorties);

    await dbActions.executeQuery(query, [updatedFavorites, userId]);
  } catch (error) {
    throw error;
  }
};

const addUserSaved = async (userId, plugId) => {
  const query = `UPDATE users
                  SET saved = JSON_ARRAY_APPEND(IFNULL(saved, '[]'), '$',JSON_OBJECT('plugId',?))
                  WHERE id =?;`;
  try {
    await dbActions.executeQuery(query, [plugId, +userId]);
  } catch (error) {
    throw error;
  }
};

const removeUserSaved = async (userId, plugId) => {
  const query = `UPDATE users SET saved = ? WHERE id = ?;`;
  try {
    const savedPlugs = await selectSavedPlugs(userId);
    let saved = JSON.parse(JSON.stringify(savedPlugs[0]["saved"])) || [];

    saved = saved.filter(
      (savedPlug) => !(savedPlug["plugId"] && savedPlug["plugId"] === plugId)
    );

    const updatedSaved = JSON.stringify(saved);

    await dbActions.executeQuery(query, [updatedSaved, userId]);
  } catch (error) {
    throw error;
  }
};

const selectUserContributions = async (userId) => {
  const query = `SELECT p.name, 
                  GROUP_CONCAT(DISTINCT JSON_OBJECT('action', jt.action, 'plugId', jt.plugId) ORDER BY jt.plugId SEPARATOR ', ') AS actions
                  FROM users
                  JOIN JSON_TABLE(users.contributions, '$[*]' COLUMNS (
                      action VARCHAR(100) PATH '$.action',
                      plugId INT PATH '$.plugId'
                  )) AS jt ON TRUE
                  JOIN plugins p ON jt.plugId = p.id
                  WHERE users.id = ?
                  GROUP BY p.name
                  ORDER BY p.name ASC;
                `;

  try {
    const contributions = await dbActions.executeQuery(query, [userId]);

    return contributions;
  } catch (error) {
    throw error;
  }
};

const selectFavoritePlugs = async (userId) => {
  const query = "SELECT favorites FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const selectSavedPlugs = async (userId) => {
  const query = "SELECT saved FROM users WHERE id = ?";
  try {
    const results = await dbActions.executeQuery(query, [userId]);
    return results;
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
