const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { createChannel, getChannels,  } = require("../controllers/channel");

const router = express.Router();

//          ---------------  CREATE  ---------------         //
// create channel using : POST api/channel/create/:serverId
router.post("/create/:serverId", fetchUser, createChannel);

//          ---------------  READ  ---------------         //
// fetch all channels of server using : GET api/channel/:serverId
router.get("/:serverId", fetchUser, getChannels);

//          ---------------  UPDATE  ---------------         //

//          ---------------  DELETE  ---------------         //

module.exports = router;
