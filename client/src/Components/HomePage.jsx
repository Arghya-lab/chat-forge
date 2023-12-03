import ChannelListBar from "./ChannelListBar";
import ServerListBar from "./ServerListBar";

function HomePage() {
  
  return (
    <div
      className="grid w-screen h-screen bg-pearl-50 dark:bg-shadow-200"
      style={{ gridTemplateColumns: "72px 1fr" }}>
      <ServerListBar />
      <div
        className="grid h-screen"
        style={{ gridTemplateColumns: "240px 1fr" }}>
        <ChannelListBar />
        HomePage
      </div>
    </div>
  );
}

export default HomePage;
