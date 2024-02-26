import express from "express";
import plugsController from "../controllers/plugsController.js";

const router = express.Router();

router.get("/plugs", plugsController.getAllPlugs);
router.post("/plugs/add", plugsController.createPlug);
router.put("/plugs/edit/:id", plugsController.updatePlug);

export default router;
