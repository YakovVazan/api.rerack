import dbActions from "../config/dbConfig.js";
import { insertContribution } from "./contributionsDataAccess.js";

const insertNewPlug = async (company, name, src, type, userId) => {
  const query = `INSERT INTO plugins (company, name, src, type) VALUES (?, ?, ?, ?)`;
  try {
    const result = await dbActions.executeQuery(query, [
      company,
      name,
      src,
      type,
    ]);
    await insertContribution("Add", name, result["insertId"], userId);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const selectPlug = async (factor, identifier) => {
  const query = `SELECT * FROM plugins WHERE ${factor} =?`;
  try {
    const [result] = await dbActions.executeQuery(query, [identifier]);
    return result;
  } catch (error) {
    throw error;
  }
};

const selectAllPlugs = async () => {
  const query = "SELECT * FROM plugins";
  try {
    const results = await dbActions.executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const alterPrice = async (id, price) => {
  const query = "UPDATE plugins SET price =? WHERE id =?";
  try {
    await dbActions.executeQuery(query, [price, id]);
  } catch (error) {
    throw error;
  }
};

const alterPlug = async (plugId, company, name, src, type, userId) => {
  const query = `UPDATE plugins SET company =?, name =?, src =?, type =? WHERE id = ${plugId}`;
  try {
    await dbActions.executeQuery(query, [company, name, src, type]);
    await insertContribution("Edit", name, plugId, userId);
  } catch (error) {
    throw error;
  }
};

const dropPlug = async (userId, plugId) => {
  const query = "DELETE FROM plugins WHERE id = ?";
  try {
    const plug = await selectPlug("id", plugId);
    await dbActions.executeQuery(query, [plugId]);
    await insertContribution("Delete", plug.name, plugId, userId);
  } catch (error) {
    throw error;
  }
};

export {
  insertNewPlug,
  selectPlug,
  selectAllPlugs,
  alterPrice,
  alterPlug,
  dropPlug,
};
