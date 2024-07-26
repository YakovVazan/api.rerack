import {
  selectUserContributions,
  selectAllContributions,
} from "../dao/contributionsDao.js";
import {
  insertNewUser,
  selectUser,
  alterHash,
  alterUser,
  selectFavoritePlugs,
  selectSavedPlugs,
  selectAllUsers,
  dropUser,
} from "../dao/usersDao.js";
import {
  insertReport,
  selectReport,
  selectUserReports,
  selectAllReports,
  deleteReport,
  replyToReport,
} from "../dao/reportsDao.js";

export default class User {
  createUser = async (email, name, hash) => {
    return await insertNewUser({ email: email, name: name, hash: hash });
  };

  getUser = async (factor, identifier) => {
    return await selectUser(factor, identifier);
  };

  resetPassword = async (email, newHash) => {
    return await alterHash(email, newHash);
  };

  updateUser = async (id, name, email, hash, isVerified) => {
    return await alterUser(id, name, email, hash, isVerified);
  };

  createReport = async (senderUserId, subject, request) => {
    return await insertReport(senderUserId, subject, request);
  };

  getReport = async (reportId) => {
    return await selectReport(reportId);
  };

  getUserReports = async (senderUserId) => {
    return await selectUserReports(senderUserId);
  };

  getAllUsersReports = async () => {
    return await selectAllReports();
  };

  deleteReport = async (reportId) => {
    return await deleteReport(reportId);
  };

  replyToReport = async (reportId, adminUserId, response) => {
    return await replyToReport(reportId, adminUserId, response);
  };

  getUserContributions = async (userId) => {
    return await selectUserContributions(userId);
  };

  getAllUsersContributions = async () => {
    return await selectAllContributions();
  };

  getFavoritePlugs = async (userId) => {
    return await selectFavoritePlugs(userId);
  };

  getSavedPlugs = async (userId) => {
    return await selectSavedPlugs(userId);
  };

  getAllUsers = async () => {
    return await selectAllUsers();
  };

  deleteUser = async (userId) => {
    return await dropUser(userId);
  };
}
