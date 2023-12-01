const express = require("express");
const { signupUser, loginUser } = require("../controllers/auth");

const router = express.Router();

// signup using : POST api/auth/signup
router.post("/signup", signupUser);
// login using : POST api/auth/login
router.post("/login", loginUser);

module.exports = router;
