import multer from "multer";

const storage = multer.diskStorage({
  destination: function destinationSettings(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function filenameSettings(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // explicitly set size limit: 1MB
  },
});

export default upload;
