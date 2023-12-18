const socketEventEnum = Object.freeze({
  CONNECTED_EVENT: "connected",
  DISCONNECT_EVENT: "disconnect",
  SOCKET_ERROR_EVENT: "socketError",
  JOIN_ROOM_EVENT: "joinRoom",
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  MESSAGE_EDITED_EVENT: "messageEdited",
  MESSAGE_DELETED_EVENT: "messageDeleted",
});

export default socketEventEnum;
