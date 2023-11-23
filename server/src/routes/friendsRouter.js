const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const {
  handleGetFriends,
  handleGetFriendsRequest,
  handleRecommandedUser,
  handleCreateFriendRequest,
  handleGetFriendById,
} = require("../controllers/friendController");
const { validateFriendRequest } = require("../validators/auth");
const runvalidation = require("../validators");

const friendRequestRouter = express.Router();

friendRequestRouter.get("/", isLoggedIn, handleGetFriends);
friendRequestRouter.get("/getFriends", isLoggedIn, handleGetFriendById);
friendRequestRouter.post(
  "/",
  isLoggedIn,
  validateFriendRequest,
  runvalidation,
  handleCreateFriendRequest
);
friendRequestRouter.get("/requests", isLoggedIn, handleGetFriendsRequest);
friendRequestRouter.get(
  "/recommandedFriend",
  isLoggedIn,
  handleRecommandedUser
);

module.exports = friendRequestRouter;
