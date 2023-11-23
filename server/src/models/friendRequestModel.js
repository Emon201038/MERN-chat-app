const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const FriendRequest = model("FriendRequest", requestSchema);

module.exports = FriendRequest;
