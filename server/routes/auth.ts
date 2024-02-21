import express from "express";

import { login } from "../controllers/auth.ts";
import { middlewareWrapper } from "../utils.ts";

const router = express.Router();

router.post("/login", middlewareWrapper(login));

export default router;
