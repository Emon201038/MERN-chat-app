const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
    reactions: [
      {
        react: {
          type: String,
          enum: ["like", "love", "care", "wow", "sad", "angry"],
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "post id is required"],
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
