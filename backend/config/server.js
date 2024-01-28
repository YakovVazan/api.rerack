import express from "express";

const app = express();
const port = process.env.PORT || 5174;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
