const multer = require("multer");
const {
  ALLOWED_POST_FILE_TYPE,
  UPLOAD_USER_IMAGE_DIRECTORY,
  UPLOAD_POST_FILE_DIRECTORY,
  ALLOWED_PROFILE_IMAGE_TYPE,
  MAX_VIDEO_FILE_SIZE,
  MAX_IMAGE_FILE_SIZE,
} = require("../configs");

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMAGE_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const profileFileFilter = (req, file, cb) => {
  if (!ALLOWED_PROFILE_IMAGE_TYPE.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_POST_FILE_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const postFileFilter = (req, file, cb) => {
  if (!ALLOWED_POST_FILE_TYPE.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter,
  limits: {
    fileSize: MAX_IMAGE_FILE_SIZE,
  },
});

const postUpload = multer({
  storage: postStorage,
  fileFilter: postFileFilter,
  limits: { fileSize: MAX_VIDEO_FILE_SIZE },
});

module.exports = { postUpload, profileUpload };
