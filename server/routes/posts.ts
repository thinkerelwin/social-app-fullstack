import express from "express";

import {
  getFeedPosts,
  getUserPosts,
  createPost,
  likePost,
} from "../controllers/posts.ts";
import { verifyToken } from "../middleware/auth.ts";
import upload from "../middleware/upload.ts";
import { middlewareWrapper } from "../utils.ts";

const router = express.Router();

router.get(
  "/",
  middlewareWrapper(verifyToken),
  middlewareWrapper(getFeedPosts)
);

router.post(
  "/",
  middlewareWrapper(verifyToken),
  upload.single("picture"),
  middlewareWrapper(createPost)
);

router.get(
  "/:userId",
  middlewareWrapper(verifyToken),
  middlewareWrapper(getUserPosts)
);

router.patch(
  "/:id/like",
  middlewareWrapper(verifyToken),
  middlewareWrapper(likePost)
);

export default router;
