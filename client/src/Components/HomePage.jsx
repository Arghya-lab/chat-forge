import { useEffect } from "react";
import { useDispatch } from "react-redux";
import initializeSocketClient from "../utils/socket";
import socketEventEnum from "../socketEventEnum";
import ServerListBar from "./ServerListBar";
import ChannelListBar from "./ChannelListBar";
import ChatContainer from "./ChatContainer";
import {
  onConnect,
  onDisconnect,
  onError,
} from "../features/socket/socketSlice";
import {
  onAddMessage,
  onDeleteMessage,
  onEditMessage,
} from "../features/message/messageSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const socket = initializeSocketClient();

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    //  On socket connect listener
    socket.on(socketEventEnum.CONNECTED_EVENT, () => dispatch(onConnect()));
    //  Socket disconnect listener
    socket.on(socketEventEnum.DISCONNECT_EVENT, () => dispatch(onDisconnect()));
    //  Socket connection error listener
    socket.on(socketEventEnum.SOCKET_ERROR_EVENT, () => dispatch(onError()));
    //  new message receive in current room listener
    socket.on(socketEventEnum.MESSAGE_RECEIVED_EVENT, (message) =>
      dispatch(onAddMessage(message))
    );
    //  edited message receive in current room listener
    socket.on(socketEventEnum.MESSAGE_EDITED_EVENT, (message) =>
      dispatch(onEditMessage(message))
    );
    //  deleted message receive in current room listener
    socket.on(socketEventEnum.MESSAGE_DELETED_EVENT, (message) =>
      dispatch(onDeleteMessage(message))
    );

    return () => {
      socket.on(socketEventEnum.CONNECTED_EVENT, () => dispatch(onConnect()));
      socket.on(socketEventEnum.DISCONNECT_EVENT, () =>
        dispatch(onDisconnect())
      );
      socket.on(socketEventEnum.SOCKET_ERROR_EVENT, () => dispatch(onError()));
      socket.on(socketEventEnum.MESSAGE_RECEIVED_EVENT, (message) =>
        dispatch(onAddMessage(message))
      );
      socket.on(socketEventEnum.MESSAGE_EDITED_EVENT, (message) =>
        dispatch(onEditMessage(message))
      );
      socket.on(socketEventEnum.MESSAGE_DELETED_EVENT, (message) =>
        dispatch(onDeleteMessage(message))
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="grid w-screen h-screen bg-pearl-50 dark:bg-shadow-200"
      style={{ gridTemplateColumns: "72px 240px 1fr" }}>
      <ServerListBar />
      <ChannelListBar />
      <ChatContainer />
    </div>
  );
}

export default HomePage;
