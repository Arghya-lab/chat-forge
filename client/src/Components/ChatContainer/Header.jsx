import { useSelector } from "react-redux";
import { Avatar, Chip, Tooltip } from "@material-tailwind/react";
import { AudioWaveform, CircleUser, Hash, Video } from "lucide-react";
import { useLocation } from "react-router-dom";

function Header() {
  const pathname = useLocation().pathname;
  const currentServer = pathname.split("/")[2];

  const { status } = useSelector((state) => state.socket);
  const { selectedChannel, currentConversation } = useSelector(
    (state) => state.selected
  );

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
      {currentServer !== "@me" ? (
        <div className="flex items-center gap-2">
          <div className="text-gray-500">
            {selectedChannel?.type === "text" ? (
              <Hash size={26} strokeWidth={2.25} />
            ) : selectedChannel?.type === "voice" ? (
              <AudioWaveform size={26} strokeWidth={2.25} />
            ) : selectedChannel?.type === "video" ? (
              <Video size={26} strokeWidth={2.25} />
            ) : null}
          </div>
          <h6 className="font-semibold text-shadow-900 dark:text-pearl-100">
            |&nbsp;{selectedChannel?.name || ""}
          </h6>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {currentConversation.imgUrl ? (
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="sm"
            />
          ) : (
            <CircleUser
              size={36}
              strokeWidth={1.75}
              style={{ color: currentConversation.avatarColor }}
            />
          )}

          <Tooltip content={currentConversation.userName} placement="bottom">
            <h6 className="font-semibold text-shadow-900 dark:text-pearl-100 cursor-default">
              {currentConversation.displayName}
            </h6>
          </Tooltip>
        </div>
      )}
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
