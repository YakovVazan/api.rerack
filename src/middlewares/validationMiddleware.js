import JwtServices from "../services/JwtServices.js";
import usersServices from "../services/usersServices.js";

const tokenRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(403).json({ msg: "Forbidden: Missing token" });

    req.token = token;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Token related error", error: error.message });
  }
};

const tokenShouldBeValid = async (req, res, next) => {
  try {
    if (JwtServices.verifyToken(req.token) === "Invalid token")
      return res.status(403).json({ msg: "Invalid token" });

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Token should be valid related error",
      error: error.message,
    });
  }
};

const administrationRequired = async (req, res, next) => {
  try {
    const decodedToken = JwtServices.verifyToken(req.token);
    if (!decodedToken.isOwner)
      return res.status(403).json({ msg: "Forbidden: Not Authorized" });

    req.isOwner = decodedToken.isOwner;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Administration related error", error: error.message });
  }
};

const administrationOrOwnershipRequired = (req, res, next) => {
  try {
    const userIdFromParams = req.params.userId;
    const decodedToken = JwtServices.verifyToken(req.token);
    const userIdFromToken = JwtServices.getUserIdFromToken(req.token);

    if (!decodedToken.isOwner && userIdFromToken !== parseInt(userIdFromParams))
      return res.status(403).json({
        msg:
          userIdFromToken?.message || "Forbidden: Token does not match user ID",
      });

    req.userId = userIdFromParams;
    req.isOwner = decodedToken.isOwner;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Administration or Ownership related error",
      error: error.message,
    });
  }
};

const idsFromTokenAndParamsShouldMatch = async (req, res, next) => {
  try {
    const userIdFromParams = req.params.userId;
    const userIdFromToken = JwtServices.getUserIdFromToken(req.token);

    if (userIdFromToken !== parseInt(userIdFromParams))
      return res.status(403).json({
        msg: userIdFromToken?.message || "Forbidden: Invalid Token",
      });

    req.userId = userIdFromParams;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "IDs from token and params should match related error",
      error: error.message,
    });
  }
};

const emailShouldNotExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await usersServices.emailExists(email);

    if (emailExists)
      return res.status(400).json({ msg: "Email already in use" });

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Email existing related error", error: error.message });
  }
};

const emailShouldExist = async (req, res, next) => {
  try {
    const emailExists = await usersServices.emailExists(req.email);

    if (!emailExists)
      return res.status(400).json({ error: "Email not registered" });

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Email not existing related error", error: error.message });
  }
};

const emailRequired = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });

    req.email = email;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Email required related error", error: error.message });
  }
};

const passwordRequired = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) return res.status(400).json({ error: "Password required" });

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Password required related error", error: error.message });
  }
};

const userShouldExistByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersServices.getUser("email", email);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "User not existing by email related error",
      error: error.message,
    });
  }
};

const userShouldExistById = async (req, res, next) => {
  try {
    const user = await usersServices.getUser("id", req.userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "User not existing by ID related error",
      error: error.message,
    });
  }
};

const passwordShouldMatch = async (req, res, next) => {
  try {
    const { password, hash } = req.body;
    const passwordMatches = await usersServices.comparePasswords(
      password,
      hash || req.user.hash
    );

    if (!passwordMatches)
      return res.status(401).json({ error: "Wrong password" });

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Password does not match related error",
      error: error.message,
    });
  }
};

const hashRequired = async (req, res, next) => {
  try {
    const { hash } = req.body;

    if (!hash) return res.status(400).json({ error: "Hash required" });

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Hash required related error", error: error.message });
  }
};

export default {
  tokenRequired,
  tokenShouldBeValid,
  administrationRequired,
  administrationOrOwnershipRequired,
  idsFromTokenAndParamsShouldMatch,
  emailShouldNotExist,
  emailShouldExist,
  emailRequired,
  passwordRequired,
  userShouldExistByEmail,
  userShouldExistById,
  passwordShouldMatch,
  hashRequired,
};
