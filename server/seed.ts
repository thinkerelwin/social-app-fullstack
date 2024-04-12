import mongoose from "mongoose";
import { CronJob } from "cron";

import User from "./models/User.ts";
import Post from "./models/Post.ts";
import { users, posts } from "./mockData/index.ts";

async function seed() {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("can't found mongo db url");
  }

  await mongoose.connect(process.env.MONGO_DB_URL);

  await User.deleteMany({});
  await Post.deleteMany({});

  await User.insertMany(users);
  await Post.insertMany(posts);

  await mongoose.disconnect();
}

const scheduledTask = new CronJob("0 0 */1 * * *", seed);

export { scheduledTask };
