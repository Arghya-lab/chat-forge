import { useSelector } from "react-redux";
import Header from "./Header";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import MediaRoom from "./MediaRoom";

function ChatContainer() {
  const { selectedChannel } = useSelector((state) => state.selected);
  const channelType = selectedChannel?.type;

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {channelType === "text" && (
        <>
          <ChatMessages />
          <ChatInput />
        </>
      )}
      {channelType === "audio" && <MediaRoom video={false} audio={true} />}
      {channelType === "video" && <MediaRoom video={true} audio={true} />}
    </div>
  );
}

export default ChatContainer;
