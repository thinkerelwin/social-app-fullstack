import { CronJob } from "cron";

import User from "./models/User.ts";
import Post from "./models/Post.ts";
import { users, posts } from "./mockData/index.ts";

async function seed() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!process.env.MONGO_DB_URL) {
    throw new Error("can't found mongo db url");
  }

  await User.deleteMany({});
  await Post.deleteMany({});

  await User.insertMany(users);
  await Post.insertMany(posts);
}

const scheduledTask = new CronJob("0 0 */4 * * *", seed);

export { scheduledTask };
