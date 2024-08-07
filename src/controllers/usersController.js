import { io } from "../config/serverConfig.js";
import { selectUser } from "../dao/usersDao.js";
import JwtServices from "../services/JwtServices.js";
import emailService from "../services/emailService.js";
import usersServices from "../services/usersServices.js";

const createUser = async (req, res) => {
  try {
    await usersServices.validateAndSanitizeUserRegistration(req);

    const { email, name, password } = req.body;

    const hashedPassword = await usersServices.hashPassword(password);
    const newUserId = await usersServices.createUser(
      email,
      name,
      hashedPassword
    );

    io.sendNewRegistration(newUserId);

    res.status(201).json(newUserId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const isAdmin = (await usersServices.getAllAdmins("email_address"))
      .map((admin) => admin.email_address)
      .includes(req.user.email);
    const isOwner = (await usersServices.getAllOwners())
      .map((owner) => +owner.userId)
      .includes(+req.user.id);
    const token = JwtServices.generateUserToken(
      req.user.id,
      isAdmin,
      isOwner,
      req.user.isVerified
    );

    res.status(200).json({
      token: token,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: isAdmin,
      isOwner: isOwner,
      isVerified: req.user.isVerified,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const checkUserSession = (req, res) => {
  const decodedToken = JwtServices.verifyToken(req.token);

  if (decodedToken === "Invalid token")
    return res.status(401).json({ msg: "Session expired" });
  else return res.status(200).json({ msg: "User session is valid" });
};

const getNewPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const newPassword = JwtServices.generate6DigitCode();
    const hash = await usersServices.hashPassword(newPassword);

    const emailSubject = "Reset Rerack's Password";
    const emailContent = `Hello
      \nWe recently received a request to reset your password. If it wasn't requested by you, you could just ignore this email.
      \nYour new password for Rerack is ${newPassword}.
      \nNote: though you may use it as your permanent password, you're encouraged to pick a stronger one.
      \n\nRerack team.
    `;

    emailService.sendEmail(email, emailSubject, emailContent);

    return res.status(200).json({ msg: "Email sent successfully", hash: hash });
  } catch (error) {
    return res.status(400).json({ error: err });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, hash } = req.body;

    await usersServices.resetPassword(email, hash);

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const verifyUser = async (req, res) => {
  try {
    const newToken = JwtServices.addVerificationCodeToToken(req.token);
    const verificationCode = JwtServices.getVerificationCodeFromToken(newToken);

    const emailSubject = "Verification Code from Rerack";
    const emailContent = `Hello ${req.user.name}
      \n\nYour verification code for Rerack is ${verificationCode}.
      \nPlease go to the settings page. Then, under Account tab, you should find the edit section.
      \nPlease enter the code in the 'new password' field and click 'Save'.
      \nNote: though you may use it as your permanent password, you're encouraged to pick a stronger one.
      \n\nRerack team.
    `;

    emailService.sendEmail(req.user.email, emailSubject, emailContent);

    res.status(200).json({
      token: newToken,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    let hashedPassword;
    const { id, name, email, password } = req.body;
    const user = await usersServices.getUser("id", id);
    const emailExists = await usersServices.emailExists(email);
    const passwordMatches = await usersServices.comparePasswords(
      password,
      user.hash
    );

    // prevent updating email into an already existing one
    if (user.email !== email && emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }
    // create a new hash only if a new password was provided
    if (password && !passwordMatches) {
      hashedPassword = await usersServices.hashPassword(password);
    } else {
      hashedPassword = user.hash;
    }

    const verificationCode = JwtServices.getVerificationCodeFromToken(
      req.token
    );
    // declare as verified only if a verification code is still stored in the token and equals to the given one
    const isVerified =
      verificationCode && verificationCode == password
        ? 1
        : email == user.email
        ? user.isVerified
        : 0;

    await usersServices.updateUser(
      req.userId,
      name || user.name, // update name only if was provided
      email || user.email, // update email only if was provided
      hashedPassword,
      isVerified
    );

    // renew token to remove verification code from it
    const newToken = JwtServices.generateUserToken(
      user.id,
      req.isAdmin,
      req.isOwner,
      isVerified
    );

    // similar logics from logging in
    res.status(201).json({
      token: newToken,
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: req.isAdmin,
      isOwner: req.isOwner,
      isVerified: isVerified,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const createReport = async (req, res) => {
  try {
    await usersServices.validateAndSanitizeReport(req);

    const { senderUserId, subject, request } = req.body;
    const newReportId = await usersServices.createReport(
      senderUserId,
      subject,
      request
    );

    io.sendReportToAdmins(newReportId);

    return res
      .status(200)
      .json({ msg: "Report created successfully", id: newReportId });
  } catch (error) {
    return res.status(500).json({ msg: error?.message });
  }
};

const getReport = async (req, res) => {
  try {
    let formattedReport;
    const report = (await usersServices.getReport(req.params.reportId))[0];
    const reporterUsername = (await selectUser("id", report.senderUserId)).name;
    const replierUsername = (await selectUser("id", report.adminUserId))?.name;

    formattedReport = report;
    formattedReport["senderUsername"] = reporterUsername;
    formattedReport["adminUsername"] = replierUsername;

    return res.status(200).json(formattedReport);
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching report" });
  }
};

const getUserReports = async (req, res) => {
  try {
    const reports = await usersServices.getUserReports(req.userId);

    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllUsersReports = async (req, res) => {
  try {
    let formattedReports = [];
    const reports = await usersServices.getAllUsersReports();

    for (const report of reports) {
      const user = await selectUser("id", report.senderUserId);
      formattedReports.push({
        id: report.id,
        senderUserId: report.userId,
        senderUsername: user?.name,
        subject: report.subject,
        request: report.request,
        requestDate: report.requestDate,
        response: report.response,
      });
    }

    return res.status(200).json(formattedReports);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await usersServices.deleteReport(reportId);

    return res.status(200).json({ msg: "Report deleted successfuly" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const replyToReport = async (req, res) => {
  try {
    await usersServices.validateAndSanitizeReply(req);

    const { reportId } = req.params;
    const { response } = req.body;
    const adminUserId = await JwtServices.getUserIdFromToken(req.token);
    const newReply = await usersServices.replyToReport(
      reportId,
      adminUserId,
      response
    );

    io.sendReplyToReporter(reportId, newReply[0].senderUserId);

    return res.status(200).json({ msg: "Replied to report successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

const getUserContributions = async (req, res) => {
  try {
    const plugs = await usersServices.getUserContributions(req.userId);

    return res.status(200).json(plugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getUsersActivity = async (req, res) => {
  let activity = [];
  const userContributions = await usersServices.getAllUsersContributions();

  for (const contribution of userContributions) {
    const user = await selectUser("id", contribution.userId);
    activity.push({
      userId: contribution.userId,
      username: user?.name,
      time: contribution.time,
      plugId: contribution.plugId,
      plugName: contribution.plugName,
      type: contribution.type,
    });
  }

  // Sort all users' activity array by the earliest action time
  activity.sort((a, b) => {
    const firstActionTimeA = new Date(a.time);
    const firstActionTimeB = new Date(b.time);
    return firstActionTimeA - firstActionTimeB;
  });

  return res.status(200).json(activity);
};

const getFavorites = async (req, res) => {
  try {
    const favoritePlugs = await usersServices.getFavoritePlugs(req.userId);

    return res.status(200).json(favoritePlugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getSaved = async (req, res) => {
  try {
    const savedPlugs = await usersServices.getSavedPlugs(req.userId);

    return res.status(200).json(savedPlugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllUsers = async (req, res) => {
  return res.json(await usersServices.getAllUsers());
};

const deleteUser = async (req, res) => {
  try {
    const response = await usersServices.deleteUser(req.userId);
    res.status(200).json({ msg: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  createUser,
  loginUser,
  getUser,
  checkUserSession,
  getNewPassword,
  resetPassword,
  verifyUser,
  updateUser,
  createReport,
  getReport,
  getUserReports,
  getAllUsersReports,
  deleteReport,
  replyToReport,
  getUserContributions,
  getUsersActivity,
  getFavorites,
  getSaved,
  getAllUsers,
  deleteUser,
};
