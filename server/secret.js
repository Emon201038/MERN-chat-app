require("dotenv").config();

const port = process.env.PORT || 3002;
const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017";
const jwtSecret =
  process.env.JWT_SECRET || "aslkjf,nei34u5y9KJAUHgriYQQQQQQQQQ";
const maxFileSize = process.env.MAX_FILE_SIZE || 1023 * 1000;
const allowedFileTypes = process.env.ALLOWED_FILE_TYPES || [
  "image/jpeg",
  "image/png",
  "image/jpg",
];
const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_URL;

module.exports = {
  port,
  dbUrl,
  jwtSecret,
  allowedFileTypes,
  maxFileSize,
  smtpUserName,
  smtpPassword,
  clientUrl,
};
