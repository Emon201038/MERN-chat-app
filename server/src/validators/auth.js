const { body } = require("express-validator");

const validateUserRegistration = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("User first name is required")
    .isLength({ min: 2, max: 32 })
    .withMessage("User name must be between 2 and 32 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("User last name is required")
    .isLength({ min: 2, max: 32 })
    .withMessage("User name must be between 2 and 32 characters"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("User phone is required")
    .isLength({ min: 11, max: 14 })
    .withMessage("User name must be between 11 and 14 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "User password must contain at least a uppercase letter,a lowercase letter,a number and a space character"
    ),
];

const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters long"),
];

const validateUserVerify = [
  body("token").notEmpty().withMessage("token is required"),
];

const validateFriendRequest = [
  body("from").notEmpty().withMessage("from is required"),
  body("to").notEmpty().withMessage("to is required"),
];

const validateTextMessage = [
  body("text").notEmpty().withMessage("text is required"),
  body("receiverId").notEmpty().withMessage("receiver id is required"),
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserVerify,
  validateFriendRequest,
  validateTextMessage,
};
