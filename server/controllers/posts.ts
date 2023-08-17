import mongoose from "mongoose";
import { Request, Response } from "express";

import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createPost(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.body);
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(400).json({ msg: "user doesn't exist." });
    }

    const newPost = new Post({
      userId: req.body.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: req.body.description,
      userPicturePath: user.picturePath,
      picturePath: req.body.picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(409).json({ error: errorMessage });
  }
}

export async function getFeedPosts(req: Request, res: Response) {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}

export async function getUserPosts(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    const posts = await Post.find({ userId: req.params.userId });

    res.status(200).json(posts);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    mongoose.sanitizeFilter(req.body);

    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "post doesn't exist." });
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        likes: post.likes,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}
