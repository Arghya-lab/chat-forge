const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { createMessage, getMessages,  } = require("../controllers/message");

const router = express.Router();

//          ---------------  CREATE  ---------------         //
// create message using : POST api/message/:roomId
router.post("/:roomId", fetchUser, createMessage);

//          ---------------  READ  ---------------         //
// fetch all messages of room using : GET api/message/:roomId
router.get("/:roomId", fetchUser, getMessages);

//          ---------------  UPDATE  ---------------         //

//          ---------------  DELETE  ---------------         //

module.exports = router;
