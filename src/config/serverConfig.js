import express from "express";
import cors from "cors";
import plugsRoutes from "../routes/plugsRoutes.js";
import usersRoutes from "../routes/usersRoutes.js";
import db from "./dbConfig.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", plugsRoutes);
app.use("/", usersRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to Rerack's API!" });
});

app.get("/*", (req, res) => {
  res.send({ msg: "Unavailable" });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}...`);
});

process.on("SIGINT", () => {
  console.log("Closing database connection...");

  // Close the server
  server.close(() => {
    console.log("...Server shut down...");
  });

  // Close the database connection
  db.close(() => {
    console.log("...Database connection closed");
    process.exit(0);
  });
});
