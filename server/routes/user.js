const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { getUsersConversations, searchUsers } = require("../controllers/user");

const router = express.Router();

// search users using : GET api/user/conversations
router.get("/conversations", fetchUser, getUsersConversations);
// search users using : GET api/user/search/:query
router.get("/search/:query", fetchUser, searchUsers);

module.exports = router;
