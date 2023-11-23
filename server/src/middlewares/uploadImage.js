const multer = require("multer");
const { maxFileSize, allowedFileTypes } = require("../../secret");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("File type is not allowed"), false);
  }
  if (file.size > maxFileSize) {
    cb(new Error("File size exceeds maximum allowed size"), false);
  }
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(new Error("File type not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
