import argon2 from "argon2";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response } from "express";

import User from "../models/User.ts";

export async function register(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.body);
    const passwordHash = await argon2.hash(req.body.password);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      picturePath: req.body.picturePath,
      friends: req.body.friends,
      location: req.body.location,
      occupation: req.body.occupation,
      viewedProfile: Math.floor(crypto.randomBytes(1).readUInt32BE() * 1000), // dummy data
      impressions: Math.floor(crypto.randomBytes(1).readUInt32BE() * 1000), // dummy data
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(500).json({ error: errorMessage });
  }
}

export async function login(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.body);
    const user = await User.findOne({ email: req.body.email }).lean();

    if (!user) {
      res.status(400).json({ msg: "user doesn't exist." });
      return;
    }
    const isMatch = await argon2.verify(user.password, req.body.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials." });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET variable doesn't exist");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    res.status(200).json({ token, user: rest });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(500).json({ error: errorMessage });
  }
}
