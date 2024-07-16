import express from "express";
import adminsController from "../controllers/adminsController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/admins/:userId/add",
  validationMiddleware.tokenRequired,
  adminsController.addAdmin
);
router.post(
  "/admins/:userId/remove",
  validationMiddleware.tokenRequired,
  adminsController.removeAdmin
);

export default router;
