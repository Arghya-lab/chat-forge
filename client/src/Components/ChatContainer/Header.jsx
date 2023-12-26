import { useSelector } from "react-redux";
import { Chip } from "@material-tailwind/react";
import { AudioWaveform, Hash, Inbox, Video } from "lucide-react";

function Header() {
  const { status } = useSelector((state) => state.socket);
  const { selectedChannel } = useSelector((state) => state.selected);

  let icon;
  if (status === "connected") {
    icon = (
      <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-700" />
    );
  } else if (status === "error") {
    icon = (
      <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-700" />
    );
  } else {
    icon = (
      <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-orange-700" />
    );
  }
  return (
    <div className="w-full px-6 py-3 flex justify-between items-center h-14 border-b-2 border-pearl-600 dark:border-shadow-900 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">
          {selectedChannel?.type === "text" ? (
            <Hash size={26} strokeWidth={2.25} />
          ) : selectedChannel?.type === "voice" ? (
            <AudioWaveform size={16} strokeWidth={2.5} />
          ) : selectedChannel?.type === "video" ? (
            <Video size={16} strokeWidth={2.5} />
          ) : (
            <Inbox size={16} strokeWidth={2.5} />
          )}
        </div>
        <h6 className="font-semibold text-shadow-900 dark:text-pearl-100">
          |&nbsp;{selectedChannel?.name || ""}
        </h6>
      </div>
      <div className="dark:bg-gray-500 rounded-md">
        <Chip
          variant="ghost"
          size="sm"
          value={
            status === "connected"
              ? "Connected"
              : status === "error"
              ? "Error"
              : "Connecting"
          }
          icon={icon}
        />
      </div>
    </div>
  );
}

export default Header;
