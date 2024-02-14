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

    const token = usersServices.generateUserToken(user.id);
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const userIdFromToken = usersServices.getUserIdFromToken(token);

    const userIdFromParams = req.params.userId;
    if (userIdFromToken !== parseInt(userIdFromParams)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await usersServices.getUser("id", userIdFromToken);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

export default { createUser, loginUser, getUser };
