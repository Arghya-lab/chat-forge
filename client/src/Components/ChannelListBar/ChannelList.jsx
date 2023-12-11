import { useDispatch, useSelector } from "react-redux";
import { AudioWaveform, ChevronRight, Hash, Video } from "lucide-react";
import { setSelectedChannel } from "../../features/selected/selectedSlice";
import axios, { authHeader } from "../../utils/axios";

function ChannelList() {
  const { channels, selectedChannel } = useSelector((state) => state.selected); //  { [text], [voice], [video] } => [ id, name, type ]
  const dispatch = useDispatch();

  const handleChannelClick = async (channel) => {
    try {
      const res = await axios.get(`/message/${channel.id}`, authHeader);
      console.log(res.data);
      dispatch(setSelectedChannel(channel));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-y-scroll no-scrollbar">
      {Object.keys(channels).map((type) =>
        channels[type].length !== 0 ? (
          <div className="my-8" key={type}>
            <div className="pl-2 mb-2 font font-semibold text-shadow-100 dark:text-pearl-600 flex items-center">
              <ChevronRight size={20} />
              <p>{type.charAt(0).toUpperCase() + type.slice(1)} Channel</p>
            </div>
            {channels[type].map((channel) => (
              <div
                key={channel.id}
                className={`px-2 py-1 mx-2 my-1 flex items-center gap-1 text-base cursor-pointer rounded ${
                  selectedChannel.id === channel.id
                    ? "text-shadow-900 dark:text-pearl-100 bg-pearl-600 dark:bg-shadow-800"
                    : "text-shadow-700 dark:text-neutral-400 hover:text-shadow-900 hover:dark:text-neutral-300 hover:bg-pearl-400 hover:dark:bg-gray-800"
                }`}
                onClick={() => handleChannelClick(channel)}>
                <div className="text-gray-700 dark:text-gray-400">
                  {channel.type === "text" ? (
                    <Hash size={16} strokeWidth={2.5} />
                  ) : channel.type === "voice" ? (
                    <AudioWaveform size={16} strokeWidth={2.5} />
                  ) : (
                    <Video size={16} strokeWidth={2.5} />
                  )}
                </div>
                <p>{channel.name}</p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}

export default ChannelList;
