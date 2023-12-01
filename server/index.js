require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectWithMongo = require("./db")
const authRoutes = require("./routes/auth")

const app = express();
const port = process.env.PORT;

/////*  ----- Config  ----- *///////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(__dirname + "/public/assets"));

/////*  ----- Connect with mongo  ----- *///////
connectWithMongo()

/////*  ----- Routes  ----- *///////
//  Auth
app.use("/api/auth", authRoutes)



/////*  ----- Server Start  ----- *///////
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
