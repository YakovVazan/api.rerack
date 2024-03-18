import express from "express";
import dataController from "../controllers/dataController.js"

const router = express.Router();

router.get('/download', dataController.downloadDb);

export default router;