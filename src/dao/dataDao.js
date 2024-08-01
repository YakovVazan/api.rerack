import { selectAllPlugs } from "./plugsDao.js";
import { selectAllUsers } from "./usersDao.js";
import { selectAllSaved } from "./savedDao.js";
import { selectAllReports } from "./reportsDao.js";
import { selectAllFavorites } from "./favoritesDao.js";
import { selectAllContributions } from "./contributionsDao.js";

const downloadDb = async () => {
  const plugs = await selectAllPlugs();
  const users = await selectAllUsers();
  const saved = await selectAllSaved();
  const reports = await selectAllReports();
  const favorites = await selectAllFavorites();
  const contributions = await selectAllContributions();

  return { users, plugs, saved, reports, favorites, contributions };
};

export default { downloadDb };
