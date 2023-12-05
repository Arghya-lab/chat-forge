import ChannelList from "./ChannelList";
import Header from "./Header";


function ChannelListBar() {

  return (
    <div className="w-60 h-screen bg-pearl-200 dark:bg-shadow-400">
      <Header />
      <ChannelList />
    </div>
  );
}

export default ChannelListBar;
