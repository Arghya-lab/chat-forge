import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import { addMessages } from "../../features/message/messageSlice";
import ChatWelcome from "./ChatWelcome";
import { areDatesSame } from "../../utils/dateFormatter";
import DeleteMessageModal from "./DeleteMessageModal";

function ChatMessages() {
  const dispatch = useDispatch();
  const { messages, totalMessage } = useSelector((state) => state.message);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(messages.length != totalMessage);
  }, [messages.length, totalMessage]);

  return (
    <div
      id="scrollableDiv"
      className={`flex-1 flex flex-col-reverse py-4 bg-pearl-50 dark:bg-shadow-200 overflow-auto white-scrollbar dark:black-scrollbar`}>
      <InfiniteScroll
        dataLength={messages.length}
        next={() => dispatch(addMessages())}
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
                (message?.senderId === messages[index + 1]?.senderId) && areDatesSame(message?.createdAt, messages[index + 1]?.createdAt)
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
    </div>
  );
}

export default ChatMessages;
