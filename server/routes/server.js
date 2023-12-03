const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/serverAvatarUpload")
const { createServer, getServers } = require("../controllers/server");

const router = express.Router();

//    ----- CREATE  -----   //
// create server using : POST api/server/create
router.post("/create", fetchUser, upload.single("serverAvatar"), createServer);
//    ----- READ  -----   //
// create server using : POST api/server
router.get("/", fetchUser, getServers);
//    ----- UPDATE  -----   //
//    ----- DELETE  -----   //

module.exports = router;
