const { Schema, model } = require("mongoose");
const Conversations = require("./conversationModel");

const messageSchema = Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversations",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", async function (next) {
  try {
    const conversation = await Conversations.findOne({
      participients: { $all: [this.sender, this.receiver] },
    });

    if (conversation) {
      conversation.lastMessage = this.toObject();

      await conversation.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const OneToOneMessage = model("OneToOneMessage", messageSchema);

module.exports = OneToOneMessage;
