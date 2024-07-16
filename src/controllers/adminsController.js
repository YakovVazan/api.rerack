import adminsService from "../services/adminsService.js";

const addAdmin = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  await adminsService.addAdmin(userId, email);

  res.status(201).json({ msg: "Added" });
};

const removeAdmin = async (req, res) => {
  await adminsService.deleteAdmin(req.userId);

  res.status(204).json({ msg: "Removed" });
};

export default { addAdmin, removeAdmin };
