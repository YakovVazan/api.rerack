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

    const newToken = JwtServices.updateToken(token);
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
    const passwordMatches = await usersServices.comparePasswords(
      password,
      user.hash
    );
    const emailExists = await usersServices.emailExists(email);
    if (user.email !== email && emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }
    if (!passwordMatches) {
      hashedPassword = await usersServices.hashPassword(password);
    } else {
      hashedPassword = user.hash;
    }

    const verificationCode = JwtServices.getVerificationCodeFromToken(token);
    const alteredUser = await usersServices.updateUser(
      userIdFromParams,
      name,
      email,
      hashedPassword,
      verificationCode ? 1 : user.isVerified
    );

    res.status(201).json(alteredUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const getUserContributions = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  if (JwtServices.verifyToken(token) === "Invalid token") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  try {
    const userId = req.params.userId;
    const plugs = await usersServices.getUserContributions(userId);

    res.json(plugs);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
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
  verifyUser,
  updateUser,
  getUserContributions,
  getAllUsers,
  deleteUser,
};
