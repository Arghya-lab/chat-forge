import {
  onConnect,
  onDisconnect,
  onError,
  onMessageReceived,
} from "../features/socket/socketSlice";
import socketEventEnum from "../socketEventEnum";
import socket from "../utils/socket"; // Import your socket instance

const socketMiddleware = (store) => (next) => (action) => {
  //  On socket connect listener
  socket.on(socketEventEnum.CONNECTED_EVENT, () => store.dispatch(onConnect()));
  //  Socket disconnect listener
  socket.on(socketEventEnum.DISCONNECT_EVENT, () =>
    store.dispatch(onDisconnect())
  );
  //  Socket connection error listener
  socket.on(socketEventEnum.SOCKET_ERROR_EVENT, () =>
    store.dispatch(onError())
  );
  //  new message receive in current room listener
  socket.on(socketEventEnum.MESSAGE_RECEIVED_EVENT, (message) =>
    store.dispatch(onMessageReceived(message))
  );

  return next(action);
};

export default socketMiddleware;
