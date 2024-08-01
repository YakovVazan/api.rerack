import archiver from "archiver";
import dataServices from "../services/dataServices.js";

const downloadDb = async (req, res) => {
  const { users, plugs, saved, reports, favorites, contributions } =
    await dataServices.getDB();

  try {
    const zip = archiver("zip");

    zip.pipe(res);
    zip.append(users, { name: "users.csv" });
    zip.append(plugs, { name: "plugs.csv" });
    zip.append(saved, { name: "saved.csv" });
    zip.append(reports, { name: "reports.csv" });
    zip.append(favorites, { name: "favorites.csv" });
    zip.append(contributions, { name: "contributions.csv" });
    zip.finalize();
  } catch (error) {
    console.error("Error generating files:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { downloadDb };
