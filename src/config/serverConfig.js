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
  res.send("Welcome to Rerack's API!");
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}...`);
});

process.on("SIGINT", () => {
  console.log("Closing database connection...");

  server.close(() => {
    console.log("Server stopped.");

    db.close(() => {
      console.log("Database connection closed.");
      process.exit(0);
    });
  });
});
