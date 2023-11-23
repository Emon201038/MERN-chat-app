const { Schema, model } = require("mongoose");

const conversationsSchema = new Schema(
  {
    participients: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Conversations = model("conversations", conversationsSchema);

module.exports = Conversations;
