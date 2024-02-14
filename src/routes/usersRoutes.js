import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/users/:userId", usersController.getUser);
router.post("/users/register", usersController.createUser);
router.post("/users/login", usersController.loginUser);

export default router;
