import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.ts";
import Post from "./models/Post.ts";
import { users, posts } from "./mockData/index.ts";

dotenv.config();

if (!process.env.MONGO_DB_URL) {
  throw new Error("can't found mongo db url");
}

await mongoose.connect(process.env.MONGO_DB_URL);

await User.deleteMany({});
await Post.deleteMany({});

await User.insertMany(users);
await Post.insertMany(posts);

await mongoose.disconnect();
