import { selectAllPlugs } from "./plugsDao.js";
import { selectAllUsers } from "./usersDao.js";

const downloadDb = async () => {
  const plugs = await selectAllPlugs();
  const users = await selectAllUsers();

  return { users, plugs };
};

export default { downloadDb };
