"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const posts_js_1 = __importDefault(require("./routes/posts.js"));
const auth_js_2 = require("./controllers/auth.js");
const posts_js_2 = require("./controllers/posts.js");
const auth_js_3 = require("./middleware/auth.js");
// TODO: change to use TS instead, add static checker, test
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "30mb" }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)()); // TODO: add whitelist
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "public/assets")));
const storage = multer_1.default.diskStorage({
    destination: function destinationSettings(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function filenameSettings(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
app.post("/auth/register", upload.single("picture"), auth_js_2.register);
app.post("/posts", auth_js_3.verifyToken, upload.single("picture"), posts_js_2.createPost);
app.use("/auth", auth_js_1.default);
app.use("/users", users_js_1.default);
app.use("/posts", posts_js_1.default);
const PORT = process.env.PORT || 3010;
try {
    await mongoose_1.default.connect(process.env.MONGO_DB_URL);
    app.listen(PORT, () => console.log(`Server Porrt: ${PORT}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
}
catch (error) {
    console.error(`${error}, didn't connect`);
}
