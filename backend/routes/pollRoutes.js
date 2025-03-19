import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {createPoll,getAllPolls,getVotedPolls,getPollById,voteOnPoll,closePoll,bookmarkPoll,getBookmarkedPolls,deletePoll} from "../controllers/pollController.js"

const router = express.Router();

router.post("/create", protect, createPoll);
router.get("/getAllPolls",protect,getAllPolls)
router.get("/votedPolls",protect,getVotedPolls)
router.get("/:id",protect,getPollById)
router.post("/:id/vote",protect,voteOnPoll)
router.post("/:id/close",protect,closePoll)
router.post("/:id/bookmark",protect,bookmarkPoll)
router.get("/user/bookmarked",protect,getBookmarkedPolls)
router.delete("/:id/delete",protect,deletePoll)


export default router;