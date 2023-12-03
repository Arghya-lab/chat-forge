const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    // conversations: {
    //   type: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Conversations",
    //   }],
    //   default: [],
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
