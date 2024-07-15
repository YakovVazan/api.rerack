import express from "express";
import dataController from "../controllers/dataController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get(
  "/download",
  validationMiddleware.tokenRequired,
  validationMiddleware.administrationRequired,
  dataController.downloadDb
);

export default router;
