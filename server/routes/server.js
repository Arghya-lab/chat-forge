const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/serverAvatarUpload")
const { createServer, getServers, createInviteLink, getInviteLink, addMember } = require("../controllers/server");

const router = express.Router();

//          ---------------  CREATE  ---------------         //
// create server using : POST api/server/create
router.post("/create", fetchUser, upload.single("serverAvatar"), createServer);
// create inviteLink using : POST api/server/inviteLink/:serverId
router.post("/inviteLink/:serverId", fetchUser,  createInviteLink)

//          ---------------  READ  ---------------         //
// fetch servers using : GET api/server
router.get("/", fetchUser, getServers);
// get server inviteLink using : POST api/server/inviteLink/:serverId
router.get("/inviteLink/:serverId", fetchUser, getInviteLink);

//          ---------------  UPDATE  ---------------         //
// add member to server using : POST api/server/:inviteCode
router.patch("/:inviteCode", fetchUser, addMember);

//          ---------------  DELETE  ---------------         //

module.exports = router;
