import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Header from "./Header";

function ChatContainer() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default ChatContainer;
