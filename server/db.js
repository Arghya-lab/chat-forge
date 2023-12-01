require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

connectWithMongo = () => {
  try {
    mongoose.connect(mongoUri);
    console.log("Successfully connected with mongoDB.");
  } catch (error) {
    console.log("error occur while connecting with mongoDB", error);
  }
};

module.exports = connectWithMongo;
