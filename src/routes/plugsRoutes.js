import express from "express";
import plugsController from "../controllers/plugsController.js";

const router = express.Router();

router.get("/", plugsController.getAllPlugs);

export default router;
