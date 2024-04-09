import express from "express";

import {
  getUser,
  getUserFriends,
  addFriend,
  removeFriend,
} from "../controllers/users.ts";
import { verifyToken } from "../middleware/auth.ts";
import { middlewareWrapper } from "../utils.ts";

const router = express.Router();

router.get("/:id", middlewareWrapper(verifyToken), middlewareWrapper(getUser));

router.get(
  "/:id/friends",
  middlewareWrapper(verifyToken),
  middlewareWrapper(getUserFriends)
);

router
  .route("/:id/:friendId")
  .post(middlewareWrapper(verifyToken), middlewareWrapper(addFriend))
  .delete(middlewareWrapper(verifyToken), middlewareWrapper(removeFriend));

export default router;
