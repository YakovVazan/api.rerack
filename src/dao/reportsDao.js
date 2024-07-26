import dbActions from "../config/dbConfig.js";

const insertReport = async (senderUserId, subject, request) => {
  try {
    const query = `
          INSERT INTO reports (senderUserId, subject, request, requestDate)
          VALUES (?, ?, ?, CURDATE())
      `;

    return await dbActions.executeQuery(query, [
      senderUserId,
      subject,
      request,
    ]);
  } catch (error) {
    throw error;
  }
};

const selectReport = async (reportId) => {
  try {
    const query = "SELECT * FROM reports WHERE id =?";
    return await dbActions.executeQuery(query, [reportId]);
  } catch (error) {
    throw error;
  }
};

const selectUserReports = async (senderUserId) => {
  try {
    const query = "SELECT * FROM reports WHERE senderUserId = ?";

    return await dbActions.executeQuery(query, [senderUserId]);
  } catch (error) {
    throw error;
  }
};

const selectAllReports = async () => {
  try {
    const query = "SELECT * FROM reports";

    return await dbActions.executeQuery(query);
  } catch (error) {
    throw error;
  }
};

const updateResponseToReport = async (adminUserId, response, reportId) => {
  try {
    const query = `
          UPDATE reports
          SET adminUserId =?, response =?, responseDate = ?
          WHERE id =?
      `;

    await dbActions.executeQuery(query, [
      adminUserId,
      response,
      new Date().toLocaleDateString(),
      reportId,
    ]);
  } catch (error) {}
};

const deleteReport = async (id) => {
  const query = `DELETE FROM reports WHERE id = ?`;
  try {
    await dbActions.executeQuery(query, [id]);
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
};
