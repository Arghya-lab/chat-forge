import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { AudioWaveform, ChevronRight, Hash, Video } from "lucide-react";
import { selectChannel } from "../../features/selected/selectedSlice";

function ChannelList() {
  const navigate = useNavigate();
  const params = useParams();

  const { channels } = useSelector((state) => state.channel); //  { [text], [voice], [video] } => [ id, name, type ]
  const { selectedChannel } = useSelector((state) => state.selected); // [ id, name, type ]

  const dispatch = useDispatch();

  const handleChannelClick = async (channel) => {
    dispatch(selectChannel(channel))
      .then(unwrapResult)
      .then((promiseResult) => {
        // handle result here
        if (params?.serverId) {
          navigate(
            `/channels/${params?.serverId}/${promiseResult?.channel?.id}`
          );
        }
      });
  };

  return (
    <div className="overflow-y-scroll scrollbar scrollbar-2-light dark:scrollbar-2-dark">
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
