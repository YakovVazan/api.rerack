import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/users", usersController.getAllUsers);
router.get("/users/activity", usersController.getUsersActivity);
router.get("/users/:userId", usersController.getUser);
router.put("/users/:userId/edit", usersController.updateUser);
router.get(
  "/users/:userId/contributions",
  usersController.getUserContributions
);
router.get("/users/:userId/favorites", usersController.getFavorites);
router.get("/users/:userId/saved", usersController.getSaved);
router.post("/users/:userId/verify", usersController.verifyUser);
router.post("/users/register", usersController.createUser);
router.post("/users/login", usersController.loginUser);
router.delete("/users/:userId/delete", usersController.deleteUser);

export default router;
