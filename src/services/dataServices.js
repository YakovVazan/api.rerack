import { Parser } from 'json2csv';
import dataDataAccess from '../dataAccess/dataDataAccess.js';

const getUsersAndPlugs = async () => {
    const { users, plugs } = await dataDataAccess.downloadDb();

    const usersCsv = parseToCsv(users);
    const plugsCsv = parseToCsv(plugs);

    return { users: usersCsv, plugs: plugsCsv };
}

const parseToCsv = (data) => {
    return new Parser().parse(data);
}

export default { getUsersAndPlugs };
