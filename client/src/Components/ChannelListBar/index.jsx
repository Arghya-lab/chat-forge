import ChannelList from "./ChannelList";
import Header from "./Header";
import ProfileContainer from "./ProfileContainer";

function ChannelListBar() {
  return (
    <div className="w-60 h-screen bg-pearl-200 dark:bg-shadow-400 flex flex-col">
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <Header />
        <ChannelList />
      </div>
      <ProfileContainer />
    </div>
  );
}

export default ChannelListBar;
