import express from "express";

import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.ts";
import { verifyToken } from "../middleware/auth.ts";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

export default router;
