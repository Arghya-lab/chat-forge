import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { CircleUser } from "lucide-react";
import modalTypes from "../../modalTypes";
import { getDateTime } from "../../utils/dateFormatter";
import { onModalClose } from "../../features/modal/modalSlice";
import { deleteMessage } from "../../features/message/messageSlice";

function DeleteMessageModal() {
  const dispatch = useDispatch();

  const modalRef = useRef(null);

  const { type, isModalOpen, data } = useSelector((state) => state.modal);
  const message = data;

  return (
    <div
      className={`absolute z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-80 flex items-center justify-center ${
        isModalOpen && type === modalTypes.DELETE_MESSAGE ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onModalClose();
        }
      }}>
      <div ref={modalRef} className="absolute w-[440px]">
        <div className="bg-pearl-700 dark:bg-shadow-700 rounded-t-md">
          <div className="relative p-4">
            <h5 className="text-xl font-bold text-neutral-900 dark:text-pearl-500 pb-4">
              Delete Message
            </h5>
            <p className="text-neutral-800 dark:text-pearl-900 pb-4 text-sm">
              Are you sure you want to delete this message?
            </p>
          </div>

          <div
            className={`min-h-[44px] py-4 mx-4 flex rounded border-neutral-300 dark:border-shadow-900 border-[1px] shadow-neutral-300 dark:shadow-gray-900 shadow-md`}>
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
            <div>
              <div className="flex items-center">
                <h3
                  className="font-normal text-sm"
                  style={{ color: message?.senderAvatarColor }}>
                  {message?.senderName}
                </h3>
                &nbsp;
                <span className="text-xs font-serif text-gray-500 cursor-default">
                  {getDateTime(message?.createdAt)}
                </span>
              </div>
              <p className="text-md text-shadow-700 dark:text-pearl-800">
                {message?.content}
              </p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs font-bold text-green-900 dark:text-green-400">
              PROTIP:
            </p>
            <p className="text-xs text-neutral-700 dark:text-neutral-400">
              You can hold down shift when clicking{" "}
              <strong>delete message</strong> to bypass this confirmation
              entirely.
            </p>
          </div>
        </div>
        <div className="p-4 flex justify-end gap-2 bg-pearl-700 dark:bg-shadow-900 rounded-b-md">
          <Button
            variant="text"
            color="gray"
            onClick={() => dispatch(onModalClose())}
            className="text-neutral-900 dark:text-pearl-500 capitalize hover:underline">
            <span>Back</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            className="text-neutral-900 dark:text-pearl-500 capitalize"
            onClick={() =>
              dispatch(deleteMessage(message.id)).then(() =>
                dispatch(onModalClose())
              )
            }>
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMessageModal;
