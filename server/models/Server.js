const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    inviteCode: {
      type: String,
      default: "",
    },
    channels: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Channel",
          // unique: true,
        },
      ],
      default: [],
    },
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
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
