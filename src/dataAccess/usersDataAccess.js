import dbActions from "../config/dbConfig.js";

const insertNewUser = async (data) => {
  const query = 'INSERT INTO users SET ?';
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

const selectAllUsers = async () => {
  const query = 'SELECT * FROM users';
  try {
    const results = await dbActions.executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const dropUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = ?';
  try {
    await dbActions.executeQuery(query, [id]);
  } catch (error) {
    throw error;
  }
};

export { insertNewUser, selectUser, selectAllUsers, dropUser };
