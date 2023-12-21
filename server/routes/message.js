const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const {
  createMessage,
  getMessages,
  editMessage,
  deleteMessage,
} = require("../controllers/message");
const upload = require("../middleware/messageFileUpload");

const router = express.Router();

//          ---------------  CREATE  ---------------         //
// create message using : POST api/message/:channelId
router.post("/:channelId", fetchUser, upload.array("file", 12), createMessage);

//          ---------------  READ  ---------------         //
// fetch all messages of room using : GET api/message/:channelId
router.get("/:channelId", fetchUser, getMessages);

//          ---------------  UPDATE  ---------------         //
// edit a message : PATCH api/message/edit/:messageId
router.patch("/edit/:messageId", fetchUser, editMessage);

//          ---------------  DELETE  ---------------         //
// mark as delete message : PATCH api/message/delete/:messageId
router.patch("/delete/:messageId", fetchUser, deleteMessage);

module.exports = router;
