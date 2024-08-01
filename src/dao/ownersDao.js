import { executeQuery } from "../config/dbConfig.js";

const selectAllOwners = async () => {
  try {
    const query = `SELECT * FROM owners`;
    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

export { selectAllOwners };
