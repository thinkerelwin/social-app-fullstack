import express from "express";
import path from "path";

import authRoutes from "./auth.ts";
import userRoutes from "./users.ts";
import postRoutes from "./posts.ts";
import { getDirname } from "../utils.ts";

const __dirname = getDirname();

const router = express.Router();

router.use("/assets", express.static(path.join(__dirname, "public/assets")));

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export default router;
