import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";
import {
  getDateTime,
  getDetailDateTime,
  getTime,
} from "../../utils/dateFormatter";
import { CircleUser, PenSquare, Trash } from "lucide-react";
import MessageData from "./MessageData";
import { onModalOpen } from "../../features/modal/modalSlice";
import modalTypes from "../../modalTypes";
import {
  setEditingDirectMessage,
  setEditingMessage,
} from "../../features/selected/selectedSlice";

function MessageItem({ message, sameAsPrevious }) {
  const serverId = useParams().serverId; //  :serverId/:channelId
  const isDirectMessages = serverId === "@me";

  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(null);

  const { server } = useSelector((state) => state.selected);
  const userId = useSelector((state) => state.auth.id);

  const isDeleted = message.deleted;
  const isOwner = userId === message?.senderId;
  const isServerMaintainer = ["admin", "moderator"].includes(server.userRole);

  const handleEdit = () => {
    if (isDirectMessages) {
      dispatch(setEditingDirectMessage(message));
    } else {
      dispatch(setEditingMessage(message));
    }
  };

  const handleDelete = () => {
    dispatch(
      onModalOpen({
        type: modalTypes.DELETE_MESSAGE,
        data: message,
      })
    );
  };

  return (
    <div
      className={`pr-10 mx-1 rounded-sm relative ${
        isHover
          ? "bg-pearl-100 dark:bg-shadow-300"
          : "bg-pearl-50 dark:bg-shadow-200"
      }`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}>
      {!sameAsPrevious ? (
        <div className={`mt-4 min-h-[44px] flex`}>
          <div className="mx-4 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center">
            {message?.senderDp ? (
              <img
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                // src={`${import.meta.env.VITE_IMG_BASE_URL}/server_imgs/${
                //   server.imgUrl
                // }`}
                width={40}
                height={40}
                className="rounded-full object-cover flex items-center justify-center"
              />
            ) : (
              <div
                className="h-[30px] w-[30px]"
                style={{ color: message?.senderAvatarColor }}>
                <CircleUser size={30} />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h3
                className="font-normal text-sm hover:underline cursor-pointer"
                style={{ color: message?.senderAvatarColor }}
                onClick={() => {
                  dispatch(
                    onModalOpen({
                      type: modalTypes.USER_PROFILE,
                      data: { userId: message?.senderId },
                    })
                  );
                }}>
                {message?.senderName}
              </h3>
              &nbsp;
              <Tooltip
                content={getDetailDateTime(message?.createdAt)}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}>
                <span className="text-xs font-serif text-gray-500 cursor-default">
                  {getDateTime(message?.createdAt)}
                </span>
              </Tooltip>
            </div>
            <MessageData message={message} />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div
            className={`w-[4.5rem] text-center ${
              isHover ? "visible" : "invisible"
            }`}>
            <Tooltip
              content={getDetailDateTime(message?.createdAt)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}>
              <p className="text-xs font-serif text-gray-500 cursor-default">
                {getTime(message?.createdAt)}
              </p>
            </Tooltip>
          </div>
          <MessageData message={message} />
        </div>
      )}
      {!isDeleted && (isOwner || isServerMaintainer) && (
        <div
          className={` ${
            isHover
              ? "flex gap-1 absolute z-10 right-0 top-[-1rem] mr-2 bg-pearl-300 dark:bg-shadow-500 text-shadow-200 dark:text-neutral-500 rounded-sm"
              : "hidden"
          }`}>
          {isOwner && (
            <button onClick={handleEdit}>
              <PenSquare
                size={18}
                className="p-2 h-8 w-8 hover:text-shadow-50 dark:hover:text-neutral-200"
              />
            </button>
          )}
          <button onClick={handleDelete}>
            <Trash
              size={18}
              className="p-2 h-8 w-8 hover:text-shadow-50 dark:hover:text-neutral-200"
            />
          </button>
        </div>
      )}
    </div>
  );
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  sameAsPrevious: PropTypes.bool.isRequired,
};

export default MessageItem;
