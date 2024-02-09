import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "@material-tailwind/react";
import { CircleUser } from "lucide-react";
import UserSearchModal from "../Modals/UserSearchModal";
import { selectConversation } from "../../features/selected/selectedSlice";

function ConversationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { conversations } = useSelector((state) => state.directMessages);

  const handleConversationClick = (conversation) => {
    dispatch(selectConversation(conversation)); //fetch messages
    navigate(`/channels/@me/${conversation?.userId}`);
  };

  return (
    <div className="overflow-y-scroll scrollbar scrollbar-2-light dark:scrollbar-2-dark">
      {conversations.map((conversation) => (
        <div
          key={conversation?.userId}
          className="flex flex-row gap-2 items-center my-2 px-2 py-1 rounded cursor-pointer hover:bg-pearl-400 dark:hover:bg-shadow-800"
          onClick={() => handleConversationClick(conversation)}>
          <Badge
            withBorder={true}
            color="green"
            overlap="circular"
            placement="bottom-end">
            {conversation?.imgUrl ? (
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="sm"
              />
            ) : (
              <CircleUser
                size={36}
                strokeWidth={1.75}
                style={{ color: conversation?.avatarColor }}
              />
            )}
          </Badge>
          <p className="text-shadow-300 dark:text-neutral-100 whitespace-nowrap">
            {conversation?.displayName}
          </p>
        </div>
      ))}
      <UserSearchModal />
    </div>
  );
}

export default ConversationList;
