import ChannelListBar from "./ChannelListBar";
import ServerListBar from "./ServerListBar";

function HomePage() {
  return (
    <div
      className="grid w-screen h-screen bg-pearl-50 dark:bg-shadow-200"
      style={{ gridTemplateColumns: "72px 240px 1fr" }}>
      <ServerListBar />
      <ChannelListBar />
      <div className="h-screen">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eius id illum excepturi libero dignissimos doloremque, esse delectus nemo fugit rerum itaque ratione quas, aliquid unde cupiditate, qui harum cumque!</div>
    </div>
  );
}

export default HomePage;
