import dbActions from "../config/dbConfig.js";

const insertNewPlug = async (data) => {
  const query = `INSERT INTO plugins SET ?`;
  try {
    const result = await dbActions.executeQuery(query, data);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const selectAllPlugs = async () => {
  const query = 'SELECT * FROM plugins';
  try {
    const results = await dbActions.executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const alterPlug = async (id, data) => {
  const query = 'UPDATE plugins SET ? WHERE id = ?';
  try {
    await dbActions.executeQuery(query, [data, id]);
  } catch (error) {
    throw error;
  }
};

const dropPlug = async (id) => {
  const query = 'DELETE FROM plugins WHERE id = ?';
  try {
    await dbActions.executeQuery(query, [id]);
  } catch (error) {
    throw error;
  }
};

export { insertNewPlug, selectAllPlugs, alterPlug, dropPlug };
