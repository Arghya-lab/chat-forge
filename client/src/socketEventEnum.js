const socketEventEnum = Object.freeze({
  CONNECTED_EVENT: "connected",
  DISCONNECT_EVENT: "disconnect",
  SOCKET_ERROR_EVENT: "socketError",

  JOIN_ROOM_EVENT: "joinRoom",
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  MESSAGE_EDITED_EVENT: "messageEdited",
  MESSAGE_DELETED_EVENT: "messageDeleted",
  
  NEW_DIRECT_CHAT_EVENT: "newDirectChat", // when there is new one on one chat
  DIRECT_MESSAGE_RECEIVED_EVENT: "directMessageReceived",
  DIRECT_MESSAGE_EDITED_EVENT: "directMessageEdited",
  DIRECT_MESSAGE_DELETED_EVENT: "directMessageDeleted",
});

export default socketEventEnum;
