const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
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
    content: {
      caption: {
        type: String,
        require: [true, "caption is required"],
      },
      file: [
        {
          type: String,
        },
      ],
      hashTag: [
        {
          type: String,
        },
      ],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);
module.exports = Post;
