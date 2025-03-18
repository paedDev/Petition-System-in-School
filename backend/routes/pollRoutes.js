import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {createPoll,} from "../controllers/pollController.js"

const router = express.Router();

router.post("/create",protect,createPoll)

export default router;