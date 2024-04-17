const express = require("express");
const { validatePost, validatePostReaction } = require("../validators/posts");
const runvalidation = require("../validators");
const {
  handleGetPosts,
  handleCreatePost,
  handleGetPostById,
  handleDeletePost,
  handleEditPost,
  handleAddReactionToPost,
} = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/auth");
const { postUpload } = require("../middlewares/uploadImage");

const postRouter = express.Router();

// GET --> http://localhost:3001/api/posts
postRouter.get("/", isLoggedIn, handleGetPosts);

// POST --> http://localhost:3001/api/posts/create
postRouter.post(
  "/create",
  isLoggedIn,
  postUpload.array("image", 4),
  validatePost,
  runvalidation,
  handleCreatePost
);

// GET --> http://localhost:3001/api/posts/:id
postRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, handleGetPostById);

// PUT --> http://localhost:3001/api/posts/:id
postRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, handleEditPost);

// DELETE --> http://localhost:3001/api/posts/:id
postRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, handleDeletePost);

// PUT --> http://localhost:3001/api/posts/toggle-reaction:id
postRouter.put(
  "/toggle-reaction",
  validatePostReaction,
  runvalidation,
  isLoggedIn,
  handleAddReactionToPost
);

module.exports = postRouter;
