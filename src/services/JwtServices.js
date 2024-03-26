import crypto from "crypto";
import jwt from "jsonwebtoken";

const secretKey = crypto.randomBytes(64).toString("hex");

const generateUserToken = (userId, isOwner) => {
  const payload = {
    userId,
    isOwner,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "7h" });
};

const verifyToken = (token) => {
  try {
    const x = jwt.verify(token, secretKey)
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
    return "Invalid token";
  }
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = verifyToken(token);

    return decodedToken.userId;
  } catch (error) {
    return error;
  }
};

export default { generateUserToken, verifyToken, getUserIdFromToken };
