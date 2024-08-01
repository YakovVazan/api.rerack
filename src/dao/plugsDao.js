import { executeQuery } from "../config/dbConfig.js";
import { insertContribution } from "./contributionsDao.js";

const insertNewPlug = async (company, name, src, type, userId) => {
  const query = `
    INSERT INTO plugins ("company", "name", "src", "type")
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  try {
    const result = await executeQuery(query, [company, name, src, type]);
    const newPlugId = result[0].id;
    await insertContribution("Add", name, newPlugId, userId);
    return newPlugId;
  } catch (error) {
    throw error;
  }
};

const selectPlug = async (factor, identifier) => {
  const query = `SELECT * FROM plugins WHERE "${factor}" = $1`;
  try {
    const result = await executeQuery(query, [identifier]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const selectAllPlugs = async () => {
  const query = "SELECT * FROM plugins";
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

const alterPrice = async (id, price) => {
  const query = `UPDATE plugins SET "price" = $1 WHERE "id" = $2`;
  try {
    await executeQuery(query, [price, id]);
  } catch (error) {
    throw error;
  }
};

const alterPlug = async (plugId, company, name, src, type, userId) => {
  const query = `
    UPDATE plugins
    SET "company" = $1, "name" = $2, "src" = $3, "type" = $4
    WHERE "id" = $5
  `;
  try {
    await executeQuery(query, [company, name, src, type, plugId]);
    await insertContribution("Edit", name, plugId, userId);
  } catch (error) {
    throw error;
  }
};

const dropPlug = async (userId, plugId) => {
  const plug = await selectPlug("id", plugId);
  const query = `DELETE FROM plugins WHERE "id" = $1`;
  try {
    await executeQuery(query, [plugId]);
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
