import express from "express";
import plugsController from "../controllers/plugsController.js";

const router = express.Router();

router.get("/plugs", plugsController.getAllPlugs);

export default router;