import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

function ChatMessages() {
  const { messages } = useSelector((state) => state.socket);

  return (
    <div className="flex-1 overflow-y-scroll no-scrollbar">
      {messages.length !==0 ? messages.map((message) => (
        <MessageItem
          key={message.id}
          content={message.content}
          deleted={message.deleted}
          createdAt={message.createdAt}
          updatedAt={message.updatedAt}
          senderName= {message.senderName}
          senderId= {message.senderId}
          senderDp= {message.senderDp}
        />
      )): <p>No messages started yet</p>}
    </div>
  );
}

export default ChatMessages;
