const express = require("express");

const {
  handleGetUsers,
  handleProcessRegister,
  handleActivateUser,
  handleEditUser,
  handleGetUser,
  handleForgetPassword,
  handleSearchUser,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserVerify,
  validateForgetPassword,
} = require("../validators/auth");
const runvalidation = require("../validators");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");

const userRouter = express.Router();

userRouter.post(
  "/process-register",
  isLoggedOut,
  upload.single("image"),
  validateUserRegistration,
  runvalidation,
  handleProcessRegister
);

userRouter.post(
  "/activate",
  validateUserVerify,
  runvalidation,
  isLoggedOut,
  handleActivateUser
);

userRouter.put("/:id", isLoggedIn, handleEditUser);

// GET ---> localhost:3001/api/users
userRouter.get("/", isLoggedIn, handleGetUsers);

userRouter.post("/search-user", handleSearchUser);

userRouter.get("/:id", handleGetUser);

userRouter.post(
  "/forget-password",
  validateForgetPassword,
  runvalidation,
  handleForgetPassword
);

module.exports = userRouter;
