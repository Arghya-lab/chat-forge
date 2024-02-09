import { useSelector } from "react-redux";
import Header from "./Header";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import MediaRoom from "./MediaRoom";
import { useLocation } from "react-router-dom";

function ChatContainer() {
  const pathname = useLocation().pathname;
  const currentServer = pathname.split("/")[2];

  const { selectedChannel } = useSelector((state) => state.selected);
  const channelType = selectedChannel?.type;

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {(channelType === "text" || currentServer === "@me") && (
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
