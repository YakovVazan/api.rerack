import cors from "cors";
import express from "express";
import db from "./dbConfig.js";
import plugsRoutes from "../routes/plugsRoutes.js";
import usersRoutes from "../routes/usersRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", plugsRoutes);
app.use("/", usersRoutes);

app.get("/", (req, res) => {
  const payload = { code: 200, msg: "Welcome to Rerack's API!" };

  res.send(payload);
});

app.get("/*", (req, res) => {
  const payload = { code: 404, msg: "not found" };
  
  res.send(payload);
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