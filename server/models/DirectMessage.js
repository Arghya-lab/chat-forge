const mongoose = require("mongoose");

const directMessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    fileUrls: {
      type: Array,
      default: [],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DirectMessage = mongoose.model("DirectMessage", directMessageSchema);
module.exports = DirectMessage;
