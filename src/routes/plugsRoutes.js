import express from "express";
import plugsController from "../controllers/plugsController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/plugs", plugsController.getAllPlugs);
router.post(
  "/plugs/add",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  plugsController.createPlug
);
router.put(
  "/plugs/edit/:id",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  plugsController.updatePlug
);
router.post(
  "/plugs/favor/:id",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  plugsController.favorPlug
);
router.post(
  "/plugs/save/:id",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  plugsController.savePlug
);
router.post(
  "/plugs/generate/description",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  plugsController.generateDescription
);
router.delete(
  "/plugs/delete/:id",
  validationMiddleware.tokenRequired,
  validationMiddleware.tokenShouldBeValid,
  validationMiddleware.administrationRequired,
  plugsController.deletePlug
);

export default router;
