import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

import authRoutes from "./routes/auth.ts";
import userRoutes from "./routes/users.ts";
import postRoutes from "./routes/posts.ts";

import { register } from "./controllers/auth.ts";
import { createPost } from "./controllers/posts.ts";
import { verifyToken } from "./middleware/auth.ts";

// import User from "./models/User";
// import Post from "./models/Post";
import { users, posts } from "./mockData";

// TODO: add static checker, test
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // TODO: add whitelist
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function destinationSettings(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function filenameSettings(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3010;

try {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("can't found mongo db url");
  }
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(PORT, () => console.log(`Server Porrt: ${PORT}`));

  // User.insertMany(users);
  // Post.insertMany(posts);
} catch (error) {
  console.error(`${error}, didn't connect`);
}
