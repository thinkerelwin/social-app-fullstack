// no need to compile ts files to js now.
// https://github.com/TypeStrong/ts-node/issues/104#issuecomment-1941702624

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import allRoutes from "./routes/index.ts";
import { scheduledTask } from "./seed.ts";

dotenv.config();

const app = express();

console.log("env", process.env.NODE_ENV);

const whitelist = process.env.SITE_URL ? [process.env.SITE_URL] : [];

app.use(express.json({ limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? whitelist
        : ["http://localhost:5173"],
  })
);

const entryRoute = process.env.ENTRY_ROUTE ?? "/";
app.use(entryRoute, allRoutes);

const PORT = process.env.PORT ?? 3010;

try {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("can't found mongo db url");
  }
  await mongoose.connect(process.env.MONGO_DB_URL);

  scheduledTask.start();
  app.listen(PORT, () => console.log(`Server Porrt: ${PORT}`));
} catch (error) {
  console.error(`${error}, didn't connect`);
}

process.on("exit", function exit() {
  scheduledTask.stop();
  console.log("stop scheduledTask");
});

process.on("SIGNIT", function forceExit() {
  scheduledTask.stop();
  console.log("force stop scheduledTask");
});
