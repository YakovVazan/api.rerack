import { io } from "../config/serverConfig.js";
import JwtServices from "../services/JwtServices.js";
import adminsService from "../services/adminsService.js";
import usersServices from "../services/usersServices.js";

const addAdmin = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  await adminsService.addAdmin(userId, email);

  const addedAdminDetails = await usersServices.getUser("id", userId);
  const newToken = JwtServices.generateUserToken(
    userId,
    true,
    false,
    addedAdminDetails.isVerified
  );

  const payload = {
    token: newToken,
    id: userId,
    isAdmin: true,
    isOwner: false,
    isVerified: addedAdminDetails.isVerified,
  };

  io.sendAdminStatus(userId, payload);

  res.status(201).json({ msg: "Added" });
};

const removeAdmin = async (req, res) => {
  await adminsService.deleteAdmin(req.userId);

  const removedAdminDetails = await usersServices.getUser("id", req.userId);
  const newToken = JwtServices.generateUserToken(
    req.userId,
    false,
    false,
    removedAdminDetails.isVerified
  );

  const payload = {
    token: newToken,
    id: req.userId,
    isAdmin: false,
    isOwner: false,
    isVerified: removedAdminDetails.isVerified,
  };

  io.sendAdminStatus(req.userId, payload);

  res.status(204).json({ msg: "Removed" });
};

export default { addAdmin, removeAdmin };
