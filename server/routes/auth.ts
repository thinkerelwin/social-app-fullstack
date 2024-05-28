import express from "express";

import { login, register } from "../controllers/auth.ts";
import upload from "../middleware/upload.ts";
import { middlewareWrapper } from "../utils.ts";

const router = express.Router();

router.post("/login", middlewareWrapper(login));
router.post("/register", upload.single("picture"), middlewareWrapper(register));

export default router;
