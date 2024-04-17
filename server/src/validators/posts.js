const { body } = require("express-validator");

const validatePost = [
  body("text").optional(),
  body("file").optional(),
  body().custom((value, { req }) => {
    // Check if at least one of the fields (text, image, or video) is provided
    if (!req.body?.text && !req.body?.file) {
      throw new Error("At least one of text or file is required");
    }
    return true;
  }),
];

const validatePostReaction = [
  body("postId").isMongoId().withMessage("Post ID must be a valid MongoDB ID"),
  body("react")
    .isIn(["like", "love", "care", "wow", "sad", "angry"])
    .withMessage("React must be one of: like, love, care, wow, sad, angry"),
];

const validateComment = [
  body("postId")
    .notEmpty()
    .withMessage("Post id is required")
    .isMongoId()
    .withMessage("Post ID must be a valid MongoDB ID"),
];

module.exports = {
  validatePost,
  validatePostReaction,
  validateComment,
};
