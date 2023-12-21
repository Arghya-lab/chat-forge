const mongoose = require("mongoose");
const { array } = require("../middleware/messageFileUpload");

const messageSchema = new mongoose.Schema(
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
      ref: "Member",
      required: true,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
