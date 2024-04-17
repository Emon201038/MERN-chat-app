const express = require("express");

const {
  handleGetUsers,
  handleProcessRegister,
  handleActivateUser,
  handleEditUser,
  handleGetUser,
  handleForgetPassword,
  handleSearchUser,
  handleVerifyCode,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserVerify,
  validateForgetPassword,
  validateVerifycode,
} = require("../validators/auth");
const runvalidation = require("../validators");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { profileUpload } = require("../middlewares/uploadImage");

const userRouter = express.Router();

userRouter.post(
  "/process-register",
  isLoggedOut,
  profileUpload.single("image"),
  validateUserRegistration,
  runvalidation,
  handleProcessRegister
);

userRouter.post(
  "/activate",
  isLoggedOut,
  validateUserVerify,
  runvalidation,
  handleActivateUser
);

userRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, handleEditUser);

// GET ---> localhost:3001/api/users
userRouter.get("/", isLoggedIn, handleGetUsers);

userRouter.post("/search-user", handleSearchUser);

userRouter.get("/:id([0-9a-fA-F]{24})", handleGetUser);

userRouter.post(
  "/forget-password",
  validateForgetPassword,
  runvalidation,
  handleForgetPassword
);

userRouter.post(
  "/forget-password/verify-code",
  validateVerifycode,
  runvalidation,
  handleVerifyCode
);

module.exports = userRouter;
