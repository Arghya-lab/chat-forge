import ServerListBar from "./ServerListBar";
import ChannelListBar from "./ChannelListBar";
import ChatContainer from "./ChatContainer";

function HomePage() {
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
