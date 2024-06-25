import crypto from "crypto";
import jwt from "jsonwebtoken";

const secretKey = crypto.randomBytes(64).toString("hex");

const generateUserToken = (userId, isOwner, isVerified) => {
  const payload = {
    userId,
    isOwner,
    isVerified,
  };

  return jwt.sign(payload, secretKey);
};

const addVerificationCodeToToken = (oldToken) => {
  const updatedPayload = {
    ...verifyToken(oldToken),
    verificationCode: generate6DigitCode(),
  };

  return jwt.sign(updatedPayload, secretKey);
};

const removeVerificationCodeToToken = (userId, isOwner, isVerified) => {
  return generateUserToken(userId, isOwner, isVerified);
};

const generate6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
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

const getVerificationCodeFromToken = (token) => {
  try {
    const decodedToken = verifyToken(token);

    return decodedToken.verificationCode;
  } catch (error) {
    return error;
  }
};

export default {
  generateUserToken,
  addVerificationCodeToToken,
  removeVerificationCodeToToken,
  verifyToken,
  getUserIdFromToken,
  getVerificationCodeFromToken,
};
