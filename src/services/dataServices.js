import { Parser } from "json2csv";
import dao from "../dao/dataDao.js";

const getUsersAndPlugs = async () => {
  const { users, plugs } = await dao.downloadDb();

  const usersCsv = parseToCsv(users);
  const plugsCsv = parseToCsv(plugs);

  return { users: usersCsv, plugs: plugsCsv };
};

const parseToCsv = (data) => {
  return new Parser().parse(data);
};

export default { getUsersAndPlugs };
