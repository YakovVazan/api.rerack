import express from "express";
import plugsController from "../controllers/plugsController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/plugs", plugsController.getAllPlugs);
router.post(
  "/plugs/add",
  validationMiddleware.tokenRequired,
  plugsController.createPlug
);
router.put(
  "/plugs/edit/:id",
  validationMiddleware.tokenRequired,
  plugsController.updatePlug
);
router.post(
  "/plugs/favor/:id",
  validationMiddleware.tokenRequired,
  plugsController.favorPlug
);
router.post(
  "/plugs/save/:id",
  validationMiddleware.tokenRequired,
  plugsController.savePlug
);
router.post(
  "/plugs/generate/description",
  validationMiddleware.tokenRequired,
  plugsController.generateDescription
);
router.delete(
  "/plugs/delete/:id",
  validationMiddleware.tokenRequired,
  plugsController.deletePlug
);

export default router;
