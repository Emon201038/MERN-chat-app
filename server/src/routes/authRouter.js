const express = require("express");
const {
  handleLogInUser,
  handleLogOutUser,
} = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { validateUserLogin } = require("../validators/auth");
const runValidation = require("../validators/index");

const authRouter = express.Router();

authRouter.post(
  "/login",
  isLoggedOut,
  validateUserLogin,
  runValidation,
  handleLogInUser
);
authRouter.post("/logout", isLoggedIn, handleLogOutUser);

module.exports = authRouter;
