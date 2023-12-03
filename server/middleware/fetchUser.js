const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Please authenticate using a valid token",
        });
    }
    const token = authorization.split("Bearer ")[1];

    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        error: "Please authenticate using a valid token",
      });
  }
};

module.exports = fetchUser;
