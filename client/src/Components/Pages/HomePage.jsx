import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import initializeSocketClient from "../../utils/socket";
import socketEventEnum from "../../socketEventEnum";
import ServerListBar from "../ServerListBar";
import ChannelListBar from "../ChannelListBar";
import ConversationListBar from "../ConversationListBar";
import ChatContainer from "../ChatContainer";
import {
  onConnect,
  onDisconnect,
  onError,
} from "../../features/socket/socketSlice";
import {
  onAddMessage,
  onDeleteMessage,
  onEditMessage,
} from "../../features/message/messageSlice";
import {
  onDeleteDirectMessage,
  onDirectMessageReceived,
  onEditDirectMessage,
  onNewDirectChat,
} from "../../features/directMessages/directMessagesSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const socket = initializeSocketClient();

function HomePage() {
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.selected);

  const pathname = useLocation().pathname;
  const currentServer = pathname.split("/")[2];

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
    //  new message receive in current room listener
    socket.on(socketEventEnum.NEW_DIRECT_CHAT_EVENT, (data) =>
      dispatch(onNewDirectChat(data))
    );
    //  new direct message receive in current room listener
    socket.on(socketEventEnum.DIRECT_MESSAGE_RECEIVED_EVENT, (message) =>
      dispatch(onDirectMessageReceived({ message, currentConversation }))
    );
    //  edited directMessage receive in current room listener
    socket.on(socketEventEnum.DIRECT_MESSAGE_EDITED_EVENT, (message) => {
      console.log(message);
      dispatch(onEditDirectMessage(message));
    });
    //  deleted direct message receive in current room listener
    socket.on(socketEventEnum.DIRECT_MESSAGE_DELETED_EVENT, (message) =>
      dispatch(onDeleteDirectMessage(message))
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
      //  new message receive in current room listener
      socket.on(
        socketEventEnum.NEW_DIRECT_CHAT_EVENT,
        (message) =>
          dispatch(onDirectMessageReceived({ message, currentConversation }))
        // {
        //   console.log(message);
        // }
      );
      //  new message receive in current room listener
      socket.on(socketEventEnum.DIRECT_MESSAGE_RECEIVED_EVENT, (message) =>
        // dispatch(onAddMessage(message))
        {
          console.log(message);
        }
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="grid w-screen h-screen bg-pearl-50 dark:bg-shadow-200"
      style={{ gridTemplateColumns: "72px 240px 1fr" }}>
      <ServerListBar />
      {currentServer === "@me" ? <ConversationListBar /> : <ChannelListBar />}
      <ChatContainer />
    </div>
  );
}

export default HomePage;
