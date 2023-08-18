import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).send("Access Denied");
      return;
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("can't found jsonwebtoken secret");
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifiedToken;

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(500).json({ error: errorMessage });
  }
}
