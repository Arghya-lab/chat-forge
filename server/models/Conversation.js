const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    userOneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userTwoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "directMessages",
          // unique: true,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
