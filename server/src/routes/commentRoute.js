const {
  handleCreateComment,
  handleGetCommentByPostId,
  handleUpdateComment,
  handleDeleteComment,
  handleReactInComment,
} = require("../controllers/commentController");
const { isLoggedIn } = require("../middlewares/auth");
const runvalidation = require("../validators");
const { validateComment } = require("../validators/posts");

const commentRouter = require("express").Router();

commentRouter.post(
  "/create",
  isLoggedIn,
  validateComment,
  runvalidation,
  handleCreateComment
);

commentRouter.get(
  "/:postId([a-f0-9A-F]{24})",
  isLoggedIn,
  handleGetCommentByPostId
);

commentRouter.put(
  "/update/:commentId([a-f0-9A-F]{24})",
  isLoggedIn,
  handleUpdateComment
);

commentRouter.delete(
  "/delete/:commentId([a-f0-9A-F]{24})",
  isLoggedIn,
  handleDeleteComment
);

commentRouter.put(
  "/react/:commentId([a-f0-9A-F]{24})",
  isLoggedIn,
  handleReactInComment
);

module.exports = commentRouter;
