import express from "express";
import plugsController from "../controllers/plugsController.js";

const router = express.Router();

router.get("/plugs", plugsController.getAllPlugs);
router.post("/plugs/add", plugsController.createPlug);
router.put("/plugs/edit/:id", plugsController.updatePlug);
router.post("/plugs/favore/:id", plugsController.favorePlug);
router.post("/plugs/save/:id", plugsController.savePlug);
router.delete("/plugs/delete/:id", plugsController.deletePlug);
router.post("/plugs/generate/description", plugsController.generateDescription);

export default router;
