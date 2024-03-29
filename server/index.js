require("dotenv").config();
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { initializeSocketIO } = require("./socket");
const connectWithMongo = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const serverRoutes = require("./routes/server");
const channelRoutes = require("./routes/channel");
const messageRoutes = require("./routes/message");
const directMessageRoutes = require("./routes/directMessage");
const fetchUser = require("./middleware/fetchUser");
const { createToken } = require("./controllers/livekit");

const port = process.env.PORT || 8001;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

/////*  ----- initializing SocketIO  ----- *///////
initializeSocketIO(io);

/////*  ----- Config  ----- *///////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(__dirname + "/public/assets"));
app.set("io", io);

/////*  ----- Connect with mongo  ----- *///////
connectWithMongo();

/////*  ----- Routes  ----- *///////
//  Auth
app.use("/api/auth", authRoutes);
//  User
app.use("/api/user", userRoutes);
//  Server
app.use("/api/server", serverRoutes);
//  Channel
app.use("/api/channel", channelRoutes);
//  Message
app.use("/api/message", messageRoutes);
//  DirectMessage
app.use("/api/directMessage", directMessageRoutes);
//  Media Room
app.get("/api/livekit/:channelId", fetchUser, createToken);

/////*  ----- Start the server  ----- *///////
httpServer.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
