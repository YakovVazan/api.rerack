import { Parser } from "json2csv";
import dao from "../dao/dataDao.js";

const getDB = async () => {
  const { users, plugs, saved, favorites, contributions } =
    await dao.downloadDb();

  const usersCsv = parseToCsv(users);
  const plugsCsv = parseToCsv(plugs);
  const savedCsv = parseToCsv(saved);
  const favoritesCsv = parseToCsv(favorites);
  const contributionsCsv = parseToCsv(contributions);

  return {
    users: usersCsv,
    plugs: plugsCsv,
    saved: savedCsv,
    favorites: favoritesCsv,
    contributions: contributionsCsv,
  };
};

const parseToCsv = (data) => {
  return new Parser().parse(data);
};

export default { getDB };
