import dbActions from "../config/dbConfig.js";
import { updateUserContribution } from "./usersDataAccess.js";

const insertNewPlug = async (data) => {
  const query = `INSERT INTO plugins SET ?`;
  try {
    const result = await dbActions.executeQuery(query, data);
    await updateUserContribution("Add", data["userId"], result["insertId"]);
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

const alterPlug = async (id, data) => {
  const query = "UPDATE plugins SET ? WHERE id = ?";
  try {
    await dbActions.executeQuery(query, [data, id]);
    await updateUserContribution("Edit", data["userId"], id);
  } catch (error) {
    throw error;
  }
};

const dropPlug = async (userId, plugId) => {
  const query = "DELETE FROM plugins WHERE id = ?";
  try {
    await updateUserContribution("Delete", userId, plugId);
    await dbActions.executeQuery(query, [plugId]);
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
