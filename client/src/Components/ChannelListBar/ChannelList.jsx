import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

function ChannelList() {
  const { channels } = useSelector((state) => state.selected); //  { [text], [voice], [video] } => [ id, name ]

  const handleChannelClick = (id)=>{
    console.log(id, "channel clicked")
  }

  return (
    <div className="h-[calc(100vh-6rem)] overflow-y-scroll no-scrollbar">
      {
        Object.keys(channels).map(type=>
          channels[type].length !== 0 ? (
          <div className="my-8" key={type}>
            <div className="pl-2 mb-2 text-pearl-600 flex items-center">
              <ChevronRight size={20} />
              <p>{type.charAt(0).toUpperCase() + type.slice(1)} Channel</p>
            </div>
            {channels[type].map((channel) => (
              <div
                key={channel.id}
                className="px-2 py-1 mx-2 text-base cursor-pointer text-neutral-400 hover:text-neutral-200 hover:bg-gray-800 rounded"
                onClick={()=>handleChannelClick(channel.id)}
                >
                {channel.name}
              </div>
            ))}
          </div>
        ):null)
      }
    </div>
  );
}

export default ChannelList;
