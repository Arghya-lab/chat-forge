const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const {
  createDirectMessage,
  getDirectMessages,
  editDirectMessage,
  deleteDirectMessage,
} = require("../controllers/directMessage");
const upload = require("../middleware/messageFileUpload");

const router = express.Router();

//          ---------------  CREATE  ---------------         //
// create directMessage using : POST api/directMessage/:receiverId
router.post(
  "/:receiverId",
  fetchUser,
  upload.array("file", 12),
  createDirectMessage
);

//          ---------------  READ  ---------------         //
// fetch all directMessages of room using : GET api/directMessage/:receiverId
router.get("/:receiverId", fetchUser, getDirectMessages);

//          ---------------  UPDATE  ---------------         //
// edit a directMessage : PATCH api/directMessage/edit/:directMessageId
router.patch("/edit/:directMessageId", fetchUser, editDirectMessage);

//          ---------------  DELETE  ---------------         //
// mark as delete directMessage : PATCH api/directMessage/delete/:directMessageId
router.patch("/delete/:directMessageId", fetchUser, deleteDirectMessage);

module.exports = router;
