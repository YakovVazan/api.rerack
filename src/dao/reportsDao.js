import { executeQuery } from "../config/dbConfig.js";

const insertReport = async (senderUserId, subject, request) => {
  const query = `
    INSERT INTO reports ("senderUserId", "subject", "request", "requestDate")
    VALUES ($1, $2, $3, CURRENT_DATE)
  `;
  try {
    return await executeQuery(query, [senderUserId, subject, request]);
  } catch (error) {
    throw error;
  }
};

const selectReport = async (reportId) => {
  const query = `SELECT * FROM reports WHERE "id" = $1`;
  try {
    return await executeQuery(query, [reportId]);
  } catch (error) {
    throw error;
  }
};

const selectUserReports = async (senderUserId) => {
  const query = `SELECT * FROM reports WHERE "senderUserId" = $1`;
  try {
    return await executeQuery(query, [senderUserId]);
  } catch (error) {
    throw error;
  }
};

const selectAllReports = async () => {
  const query = "SELECT * FROM reports";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const updateResponseToReport = async (adminUserId, response, reportId) => {
  const query = `
    UPDATE reports
    SET "adminUserId" = $1, "response" = $2, "responseDate" = $3
    WHERE "id" = $4
  `;
  try {
    await executeQuery(query, [adminUserId, response, CURRENT_DATE, reportId]);
  } catch (error) {
    throw error;
  }
};

const deleteReport = async (id) => {
  const query = `DELETE FROM reports WHERE "id" = $1`;
  try {
    await executeQuery(query, [id]);
  } catch (error) {
    throw error;
  }
};

const replyToReport = async (reportId, adminUserId, response) => {
  const updateQuery = `
    UPDATE reports
    SET "adminUserId" = $1, "response" = $2, "responseDate" = CURRENT_DATE
    WHERE "id" = $3
  `;
  const selectQuery = `SELECT "senderUserId" FROM reports WHERE "id" = $1`;
  try {
    await executeQuery(updateQuery, [adminUserId, response, reportId]);
    return await executeQuery(selectQuery, [reportId]);
  } catch (error) {
    throw error;
  }
};

export {
  insertReport,
  selectReport,
  selectUserReports,
  selectAllReports,
  updateResponseToReport,
  deleteReport,
  replyToReport,
};
