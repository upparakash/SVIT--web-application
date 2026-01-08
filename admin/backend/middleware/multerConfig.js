const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const filename = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, `${Date.now()}-${uuidv4()}${ext}`);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename,
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetypeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(ext);
  if (mimetypeOk && extOk) cb(null, true);
  else cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only image files are allowed"));
};

const limits = {
  fileSize: 5 * 1024 * 1024,
  files: 8,
};

const baseUpload = multer({ storage, fileFilter, limits });

module.exports = {
  uploadSingle: (fieldName) => baseUpload.single(fieldName),
  uploadArray: (fieldName, maxCount = 4) => baseUpload.array(fieldName, maxCount),

  //  THIS IS REQUIRED FOR YOUR BANNER
  uploadFields: (fields) => baseUpload.fields(fields),

  baseUpload,
  uploadDir,
};
