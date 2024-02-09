import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import { addMessages } from "../../features/message/messageSlice";
import ChatWelcome from "./ChatWelcome";
import { areDatesSame } from "../../utils/dateFormatter";
import DeleteMessageModal from "./DeleteMessageModal";
import UserProfileModal from "../Modals/UserProfileModal";
import { addDirectMessages } from "../../features/directMessages/directMessagesSlice";

function ChatMessages() {
  const serverId = useParams().serverId; //  :serverId/:channelId
  const isDirectMessages = serverId === "@me";

  const dispatch = useDispatch();
  const { messages: channelMessages, totalMessage: totalChannelMessage } =
    useSelector((state) => state.message);
  const { directMessages, totalDirectMessage } = useSelector(
    (state) => state.directMessages
  );
  const [hasMore, setHasMore] = useState(true);

  let totalMessage = isDirectMessages
    ? totalDirectMessage
    : totalChannelMessage;
  let messages = isDirectMessages ? directMessages : channelMessages;

  const addMoreMessages = () => {
    if (isDirectMessages) {
      dispatch(addDirectMessages());
    } else {
      dispatch(addMessages());
    }
  };
  useEffect(() => {
    setHasMore(messages.length < totalMessage);
  }, [messages.length, totalMessage]);

  return (
    <div
      id="scrollableDiv"
      className={`flex-1 flex flex-col-reverse py-4 bg-pearl-50 dark:bg-shadow-200 overflow-auto scrollbar scrollbar-1-light dark:scrollbar-1-dark`}>
      <InfiniteScroll
        dataLength={messages.length}
        next={addMoreMessages}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={<ChatWelcome />}>
        {messages.length !== 0 ? (
          messages.map((message, index) => {
            let sameAsPrevious = false;
            if (messages.length === index + 1) {
              sameAsPrevious = false;
            } else {
              sameAsPrevious =
                message?.senderId === messages[index + 1]?.senderId &&
                areDatesSame(
                  message?.createdAt,
                  messages[index + 1]?.createdAt
                );
            }
            return (
              <MessageItem
                key={message.id}
                message={message}
                sameAsPrevious={sameAsPrevious}
              />
            );
          })
        ) : (
          <p>No messages started yet</p>
        )}
      </InfiniteScroll>
      <DeleteMessageModal />
      <UserProfileModal />
    </div>
  );
}

export default ChatMessages;
