import { executeQuery } from "../config/dbConfig.js";

const validColumnNames = ["type", "time", "userId", "plugId"];

const selectUserContributions = async (userId) => {
  try {
    const query = `
      SELECT c.*, p."name" as "plugName"
      FROM "contributions" c
      JOIN "plugins" p ON c."plugId" = p."id"
      WHERE c."userId" = $1
    `;

    return await executeQuery(query, [userId]);
  } catch (error) {
    throw error;
  }
};

const selectAllContributions = async () => {
  try {
    const query = "SELECT * FROM contributions";

    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const updateContributionedDetails = async (plugName, plugId) => {
  try {
    const query = `
        UPDATE contributions
        SET "plugName" = $1
        WHERE "plugId" = $2
    `;

    await executeQuery(query, [plugName, plugId]);
  } catch (error) {
    // Handle the error
  }
};

const insertContribution = async (type, plugName, plugId, userId) => {
  try {
    const query = `
        INSERT INTO contributions ("type", "time", "plugName", "plugId", "userId")
        VALUES ($1, $2, $3, $4, $5)
    `;

    const result = await executeQuery(query, [
      type,
      new Date(),
      plugName,
      plugId,
      userId,
    ]);

    await updateContributionedDetails(plugName, plugId);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteContribution = async (column, value) => {
  if (!validColumnNames.includes(column)) {
    throw new Error("Invalid column name");
  }

  const query = `DELETE FROM contributions WHERE "${column}" = $1`;
  try {
    await executeQuery(query, [value]);
  } catch (error) {
    throw error;
  }
};

export {
  selectUserContributions,
  selectAllContributions,
  insertContribution,
  deleteContribution,
};
