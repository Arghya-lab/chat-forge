const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(401).json({
        error: "Please authenticate using a valid token",
      });
    }
    const token = authorization.split("Bearer ")[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = fetchUser;
