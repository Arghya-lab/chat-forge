const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "audio", "video"],
      default: "text",
    },
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
          unique: true,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Server = mongoose.model("Server", serverSchema);
module.exports = Server;
