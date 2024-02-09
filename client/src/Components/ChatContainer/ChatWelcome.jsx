import { Avatar } from "@material-tailwind/react";
import { CircleUser, Hash } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ChatWelcome() {
  const params = useParams(); //  :serverId/:channelId

  const { selectedChannel, currentConversation } = useSelector(
    (state) => state.selected
  );
  const channelName = selectedChannel?.name;

  return (
    <div className="space-y-2 px-4 mb-4">
      {params.serverId === "@me" ? (
        // in direct message
        currentConversation?.imgUrl ? (
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="xl"
          />
        ) : (
          <CircleUser
            size={72}
            strokeWidth={2.5}
            style={{ color: currentConversation?.avatarColor }}
          />
        )
      ) : (
        // in channel's chat
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash size={72} className="text-neutral-800 dark:text-pearl-500" />
        </div>
      )}
      <p className="text-3xl font-bold text-neutral-800 dark:text-pearl-800">
        {params.serverId === "@me"
          ? currentConversation?.displayName
          : `Welcome to #${channelName}`}
      </p>
      {params.serverId === "@me" && (
        <p className="text-2xl font-semibold text-neutral-800 dark:text-pearl-800">
          {currentConversation?.userName}
        </p>
      )}
      <p className="text-neutral-700 dark:text-neutral-300">
        {params.serverId === "@me" ? (
          <>
            <span>
              This is the beginning of your direct message history with
            </span>
            &nbsp;<strong>{currentConversation?.displayName}</strong>
          </>
        ) : (
          <>This is the start of the #${channelName} channel.</>
        )}
      </p>
    </div>
  );
}

export default ChatWelcome;
