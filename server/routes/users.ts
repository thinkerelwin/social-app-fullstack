import express from "express";

import {
  getUser,
  getUserFriends,
  addFriend,
  removeFriend,
} from "../controllers/users.ts";
import { verifyToken } from "../middleware/auth.ts";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.post("/:id/:friendId", verifyToken, addFriend);

router.delete("/:id/:friendId", verifyToken, removeFriend);

export default router;
