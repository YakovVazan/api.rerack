import archiver from 'archiver';
import JWTServices from '../services/JWTServices.js';
import dataServices from "../services/dataServices.js";

const downloadDb = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "Forbidden: Missing token" });
    }

    const decodedToken = JWTServices.verifyToken(token);

    if (decodedToken.isOwner) {
        const { users, plugs } = await dataServices.getUsersAndPlugs();

        try {
            const zip = archiver('zip');

            zip.pipe(res);
            zip.append(users, { name: 'users.csv' });
            zip.append(plugs, { name: 'plugs.csv' });
            zip.finalize();
        } catch (error) {
            console.error('Error generating files:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(403).json({ msg: "Forbidden: Not Authorized" });
    }
}

export default { downloadDb };
