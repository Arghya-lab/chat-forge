import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import { useState } from "react";

function ChatMessages() {
  const { messages } = useSelector((state) => state.selected);
  const [hoverMessage, setHoverMessage] = useState(null);

  return (
    <div className="flex-1 overflow-y-scroll no-scrollbar">
      {messages.length !== 0 ? (
        messages.map((message, index) => {
          return (
            <div
              key={message.id}
              onPointerEnter={() => setHoverMessage(message.id)}
              onPointerLeave={() => setHoverMessage(null)}>
              <MessageItem
                content={message.content}
                deleted={message.deleted}
                createdAt={message.createdAt}
                updatedAt={message.updatedAt}
                senderName={message.senderName}
                senderId={message.senderId}
                senderDp={message.senderDp}
                senderAvatarColor={message.senderAvatarColor}
                sameUserAsPrevious={
                  index !== 0 &&
                  message.senderId === messages[index - 1].senderId
                }
                isHover={hoverMessage === message.id}
              />
            </div>
          );
        })
      ) : (
        <p>No messages started yet</p>
      )}
    </div>
  );
}

export default ChatMessages;
