import multer from "multer";

const storage = multer.diskStorage({
  destination: function destinationSettings(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function filenameSettings(req, file, cb) {
    // Address the issue of filenames being converted after uploading
    // https://github.com/expressjs/multer/issues/1104
    const fixedName = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, fixedName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // explicitly set size limit: 1MB
  },
});

export default upload;
