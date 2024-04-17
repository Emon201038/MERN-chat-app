const express = require("express");
const {
  handleLogInUser,
  handleLogOutUser,
  handleRefreshToken,
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
authRouter.get("/refresh-token", handleRefreshToken);

module.exports = authRouter;
