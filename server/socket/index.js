require("dotenv").config();
const jwt = require("jsonwebtoken");
const eventEnum = require("./eventEnum");

const jwtSecret = process.env.JWT_SECRET;

/////*  ----- Socket.io logic for handling connections  ----- *///////
const initializeSocketIO = (io) => {
  io.on("connection", (socket) => {
    try {
      // Checking if authorize user want to connect socket
      const auth = socket.handshake.auth?.token;
      if (!auth) {
        console.error("unauthorized token handshake");
      }
      const token = auth.split("Bearer ")[1];
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded?.userId) {
        console.error("unauthorized token handshake");
      }

      socket.user = decoded; // mounting the decoded token object to the socket
      // We are creating a room with userId so that if user is joined but does not have any active chat going on.
      // still we want to emit some socket events to the user.
      socket.join(decoded?.userId);
      socket.emit(eventEnum.CONNECTED_EVENT); // emit the connected event to the client so that client is aware
      console.log(
        "A new user connected to socket.🪄  SocketId: ",
        socket.id,
        ". UserId: ",
        socket.user?.userId
      );

      // Common chat event that needs to mounted on initialization
      // mount join chat event
      let prevRoom;
      socket.on(eventEnum.JOIN_ROOM_EVENT, (roomId) => {
        //  if user previously joined a room then leave previous room
        if (prevRoom) {
          socket.leave(prevRoom);
        }
        // joining the room with the roomId will allow specific events to be fired. User will get live message in the room.
        socket.join(roomId);
        prevRoom = roomId;
        console.log(`User joined the room.🎪 roomId: `, roomId);
      });

      socket.on(eventEnum.DISCONNECT_EVENT, () => {
        if (socket.user?.userId) {
          //  prevents unnecessary data transmission or event targeting a disconnected user.
          socket.leave(socket.user.userId);
        }
        console.log("A user disconnected.❌ UserId: ", socket.user?.userId);
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
