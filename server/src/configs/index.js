const UPLOAD_USER_IMAGE_DIRECTORY = "public/users/images";
const UPLOAD_POST_FILE_DIRECTORY = "public/posts";
const MAX_IMAGE_FILE_SIZE = 5242880;
const MAX_VIDEO_FILE_SIZE = 52428800;
const ALLOWED_PROFILE_IMAGE_TYPE = ["image/jpg", "image/jpeg", "image/png"];
const ALLOWED_POST_FILE_TYPE = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/mp3",
  "video/mp4",
];

module.exports = {
  UPLOAD_POST_FILE_DIRECTORY,
  UPLOAD_USER_IMAGE_DIRECTORY,
  ALLOWED_PROFILE_IMAGE_TYPE,
  ALLOWED_POST_FILE_TYPE,
  MAX_IMAGE_FILE_SIZE,
  MAX_VIDEO_FILE_SIZE,
};
