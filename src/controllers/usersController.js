import authorizedEmailAddresses from "../consts/emails.js";
import usersServices from "../services/usersServices.js";
import JwtServices from "../services/JwtServices.js";
import emailService from "../services/emailService.js";

const createUser = async (req, res) => {
  try {
    await usersServices.validateAndSanitizeUserInput(req);

    const { email, name, password } = req.body;

    const emailExists = await usersServices.emailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await usersServices.hashPassword(password);
    const newUser = await usersServices.createUser(email, name, hashedPassword);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const emailExists = await usersServices.emailExists(email);
    if (!emailExists) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const user = await usersServices.getUser("email", email);
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const passwordMatches = await usersServices.comparePasswords(
      password,
      user.hash
    );
    if (!passwordMatches) {
      return res.status(401).json({ error: "Wrong password." });
    }

    const isOwner = authorizedEmailAddresses.includes(user.email);
    const token = JwtServices.generateUserToken(
      user.id,
      isOwner,
      user.isVerified
    );

    res.status(200).json({
      token: token,
      id: user.id,
      name: user.name,
      email: user.email,
      isOwner: isOwner,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    const decodedToken = JwtServices.verifyToken(token);
    const userIdFromParams = req.params.userId;
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (
      !decodedToken.isOwner &&
      userIdFromToken !== parseInt(userIdFromParams)
    ) {
      return res.status(403).json({
        msg:
          userIdFromToken?.message || "Forbidden: Token does not match user ID",
      });
    }

    const user = await usersServices.getUser("id", userIdFromParams);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const getNewPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const emailExists = await usersServices.emailExists(email);
    if (!emailExists) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const newPassword = JwtServices.generate6DigitCode();
    const hash = await usersServices.hashPassword(newPassword);

    emailService.sendEmail(email, newPassword);

    return res.status(200).json({ msg: "Email sent successfully", hash: hash });
  } catch (error) {
    return res.status(400).json({ error: err });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, hash } = req.body;

    if (!email || !password || !hash) {
      return res.status(400).json({ error: "Password is required." });
    }

    const emailExists = await usersServices.emailExists(email);
    if (!emailExists) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const passwordMatches = await usersServices.comparePasswords(
      password,
      hash
    );
    if (!passwordMatches) {
      return res.status(401).json({ error: "Wrong password." });
    }

    await usersServices.resetPassword(email, hash);

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    const userIdFromParams = req.params.userId;
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (userIdFromToken !== parseInt(userIdFromParams)) {
      return res.status(403).json({
        msg:
          userIdFromToken?.message || "Forbidden: Token does not match user ID",
      });
    }

    const user = await usersServices.getUser("id", userIdFromParams);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const newToken = JwtServices.addVerificationCodeToToken(token);
    const verificationCode = JwtServices.getVerificationCodeFromToken(newToken);

    emailService.sendEmail(user.email, verificationCode);

    res.status(200).json({
      token: newToken,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    const decodedToken = JwtServices.verifyToken(token);
    const userIdFromParams = req.params.userId;
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (
      !decodedToken.isOwner &&
      userIdFromToken !== parseInt(userIdFromParams)
    ) {
      return res.status(403).json({
        msg:
          userIdFromToken?.message || "Forbidden: Token does not match user ID",
      });
    }

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

    const verificationCode = JwtServices.getVerificationCodeFromToken(token);
    // declare as verified only if a verification code is still stored in the token and equals to the given one
    const isVerified =
      verificationCode && verificationCode == password
        ? 1
        : email == user.email
        ? user.isVerified
        : 0;

    await usersServices.updateUser(
      userIdFromParams,
      name || user.name, // update name only if was provided
      email || user.email, // update email only if was provided
      hashedPassword,
      isVerified
    );

    // renew token to remove verification code from it
    const newToken = JwtServices.generateUserToken(
      user.id,
      decodedToken.isOwner,
      isVerified
    );

    // similar logics from logging in
    res.status(201).json({
      token: newToken,
      id: user.id,
      name: user.name,
      email: user.email,
      isOwner: decodedToken.isOwner,
      isVerified: isVerified,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const getUserContributions = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    if (JwtServices.verifyToken(token) === "Invalid token") {
      return res.status(403).json({ msg: "Invalid token" });
    }

    const userIdFromParams = req.params.userId;
    const decodedToken = JwtServices.verifyToken(token);
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (
      !decodedToken.isOwner &&
      userIdFromToken !== parseInt(userIdFromParams)
    ) {
      return res.status(403).json({
        msg: userIdFromToken?.message || "Unauthorized",
      });
    }

    const user = await usersServices.getUser("id", userIdFromParams);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const plugs = await usersServices.getUserContributions(userIdFromParams);

    return res.status(200).json(plugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getUsersActivity = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  const decodedToken = JwtServices.verifyToken(token);

  if (decodedToken.isOwner) {
    let activity = [];
    const users = await usersServices.getAllUsers();

    for (const user of users) {
      const contribution = await usersServices.getUserContributions(user.id);

      contribution.forEach((contribution) => {
        if (contribution["contributions"] !== null) {
          contribution["contributions"].forEach((userContribution) => {
            activity.push({
              userId: user.id,
              username: user.name,
              plugId: userContribution.id,
              plugName: userContribution.name,
              actions: userContribution.actions,
            });
          });
        }
      });
    }

    return res.status(200).json(activity);
  } else {
    res.status(403).json({ msg: "Forbidden: Not Authorized" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    if (JwtServices.verifyToken(token) === "Invalid token") {
      return res.status(403).json({ msg: "Invalid token" });
    }

    const userIdFromParams = req.params.userId;
    const decodedToken = JwtServices.verifyToken(token);
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (
      !decodedToken.isOwner &&
      userIdFromToken !== parseInt(userIdFromParams)
    ) {
      return res.status(403).json({
        msg: userIdFromToken?.message || "Unauthorized",
      });
    }

    const user = await usersServices.getUser("id", userIdFromParams);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const favoritePlugs = await usersServices.getFavoritePlugs(
      userIdFromParams
    );

    return res.status(200).json(favoritePlugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getSaved = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    if (JwtServices.verifyToken(token) === "Invalid token") {
      return res.status(403).json({ msg: "Invalid token" });
    }

    const userIdFromParams = req.params.userId;
    const decodedToken = JwtServices.verifyToken(token);
    const userIdFromToken = JwtServices.getUserIdFromToken(token);
    if (
      !decodedToken.isOwner &&
      userIdFromToken !== parseInt(userIdFromParams)
    ) {
      return res.status(403).json({
        msg: userIdFromToken?.message || "Unauthorized",
      });
    }

    const user = await usersServices.getUser("id", userIdFromParams);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const savedPlugs = await usersServices.getSavedPlugs(userIdFromParams);

    return res.status(200).json(savedPlugs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  const decodedToken = JwtServices.verifyToken(token);

  if (decodedToken.isOwner) {
    res.json(await usersServices.getAllUsers());
  } else {
    res.status(403).json({ msg: "Forbidden: Not Authorized" });
  }
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  const decodedToken = JwtServices.verifyToken(token);
  const userIdFromParams = req.params.userId;
  const userIdFromToken = JwtServices.getUserIdFromToken(token);
  if (!decodedToken.isOwner && userIdFromToken !== parseInt(userIdFromParams)) {
    return res.status(403).json({
      msg:
        userIdFromToken?.message || "Forbidden: Token does not match user ID",
    });
  }

  try {
    const response = await usersServices.deleteUser(userIdFromParams);
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
  getNewPassword,
  resetPassword,
  verifyUser,
  updateUser,
  getUserContributions,
  getUsersActivity,
  getFavorites,
  getSaved,
  getAllUsers,
  deleteUser,
};
