import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { register } from "./controllers/auth.js";

// TODO: change to use TS instead
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

const PORT = process.env.PORT || 3010;

try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(PORT, () => console.log(`Server Porrt: ${PORT}`));
} catch (error) {
  console.error(`${error}, didn't connect`);
}
