require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getColor = require("../utils/popColor");

const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;

const signupUser = async (req, res) => {
  try {
    const { email, displayName, userName, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ error: "User already present." });

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const user = await User.create({
        email,
        userName,
        displayName,
        avatarColor: getColor(),
        password: hash,
      });
      const token = jwt.sign(
        { userId: user._id, iat: Math.floor(Date.now() / 1000) - 30 },
        jwtSecret
      );

      res.status(201).json({
        displayName,
        userName,
        imgUrl: "",
        avatarColor: user.avatarColor,
        token: `Bearer ${token}`,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error occur while creating user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    bcrypt.compare(password, user.password, function (err, result) {
      if (!result)
        return res.status(400).json({ error: "Invalid credentials." });
      const token = jwt.sign(
        { userId: user._id, iat: Math.floor(Date.now() / 1000) - 30 },
        jwtSecret
      );

      res.status(200).json({
        displayName: user.displayName,
        userName: user.userName,
        imgUrl: user.imgUrl,
        avatarColor: user.avatarColor,
        token: `Bearer ${token}`,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error occur while fetching user." });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
