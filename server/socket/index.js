const eventEnum = require("./eventEnum");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

/////*  ----- Socket.io logic for handling connections  ----- *///////
const initializeSocketIO = (io) => {
  io.on("connection", (socket) => {
    try {
      const auth = socket.handshake.auth?.token;
      if (!auth) {
        // unauthorized token handshake
        console.error("unauthorized token handshake");
      }
      const token = auth.split("Bearer ")[1];
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded?.userId) {
        // unauthorized token handshake
        console.error("unauthorized token handshake");
      }
      socket.user = decoded; // mounting the user object to the socket
      // socket.join(decoded?.userId)
      socket.emit(eventEnum.CONNECTED_EVENT); // emit the connected event to the client
      console.log(
        "A new user connected to socket.🪄  SocketId: ",
        socket.id,
        ". UserId: ",
        socket.user?.userId
      );

      let prevRoom;
      socket.on(eventEnum.JOIN_ROOM_EVENT, (roomId) => {
        //  if user previously joined a room then leave previous room
        if (prevRoom) {
          socket.leave(prevRoom);
        }
        console.log(`User joined the room.🎪 roomId: `, roomId);
        // joining the room with the roomId will allow specific events to be fired. User will get live message in the room.
        socket.join(roomId);
        prevRoom = roomId;
      });

      socket.on(eventEnum.DISCONNECT_EVENT, () => {
        console.log("A user disconnected.❌ UserId: ", socket.user?.userId);
        // if (socket.user?.userId) {
        // socket.leave(socket.user.userId);
        // }
      });
    } catch (error) {
      socket.emit(
        eventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};

const emitSocketEvent = (req, roomId, event, payload) => {
  req.app.get("io").to(roomId).emit(event, payload);
};

module.exports = { initializeSocketIO, emitSocketEvent };
