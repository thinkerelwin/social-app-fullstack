import express from "express";

import {
  getUser,
  getUserFriends,
  addFriends,
  removeFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.post("/:id/:friendId", verifyToken, addFriends);

// TODO maybe adding patch for friends?

router.delete("/:id/:friendId", verifyToken, removeFriends);

export default router;
