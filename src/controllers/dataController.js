import archiver from "archiver";
import dataServices from "../services/dataServices.js";

const downloadDb = async (req, res) => {
  const { users, plugs } = await dataServices.getUsersAndPlugs();

  try {
    const zip = archiver("zip");

    zip.pipe(res);
    zip.append(users, { name: "users.csv" });
    zip.append(plugs, { name: "plugs.csv" });
    zip.finalize();
  } catch (error) {
    console.error("Error generating files:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { downloadDb };
