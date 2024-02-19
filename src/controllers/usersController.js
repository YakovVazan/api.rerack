import authorizedEmailAddresses from "../consts/emails.js";
import usersServices from "../services/usersServices.js";

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

    const token = usersServices.generateUserToken(
      user.id,
      authorizedEmailAddresses.includes(user.email)
    );
    res
      .status(200)
      .json({ token: token, id: user.id, name: user.name, email: user.email });
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

    const decodedToken = usersServices.verifyToken(token);
    const userIdFromParams = req.params.userId;
    const userIdFromToken = usersServices.getUserIdFromToken(token);
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
      return res.json({ msg: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Forbidden: Missing token" });
  }

  const decodedToken = usersServices.verifyToken(token);
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

  const decodedToken = usersServices.verifyToken(token);
  const userIdFromParams = req.params.userId;
  const userIdFromToken = usersServices.getUserIdFromToken(token);
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

export default { createUser, loginUser, getUser, getAllUsers, deleteUser };
