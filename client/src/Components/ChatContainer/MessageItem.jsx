import { CircleUser } from "lucide-react";
import PropTypes from "prop-types";

function MessageItem({
  content,
  deleted,
  createdAt,
  updatedAt,
  senderName,
  senderId,
  senderDp,
  senderAvatarColor,
  sameUserAsPrevious,
  isHover,
}) {
  return !sameUserAsPrevious ? (
    <div className="mt-4 min-h-[44px] mr-10 flex">
      <div className="mx-4 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center">
        {senderDp ? (
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
            style={{ color: senderAvatarColor }}>
            <CircleUser size={30} />
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center">
          <h3
            className="font-normal text-sm"
            style={{ color: senderAvatarColor }}>
            {senderName}
          </h3>
          {/* //  logo */}
          &nbsp;
          <span className="text-xs font-serif text-gray-500">{createdAt}</span>
        </div>
        <p className="text-md text-shadow-700 dark:text-pearl-800">{content}</p>
      </div>
    </div>
  ) : (
    <div className="flex hover:visible">
      <div className={`w-[4.5rem] text-center ${isHover?"visible":"invisible"}`}>
      <span className="text-xs font-serif text-gray-500">17:35</span>
      </div>
      <p className="text-md text-shadow-700 dark:text-pearl-800">{content}</p>
    </div>
  );
}

MessageItem.propTypes = {
  content: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  senderDp: PropTypes.string.isRequired,
  senderAvatarColor: PropTypes.string.isRequired,
  sameUserAsPrevious: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
};

export default MessageItem;
