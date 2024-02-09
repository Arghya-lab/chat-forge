import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageCirclePlus } from "lucide-react";
import { Avatar, Button } from "@material-tailwind/react";
import modalTypes from "../../modalTypes";
import { onModalClose } from "../../features/modal/modalSlice";
import { Navigate } from "react-router-dom";

function UserProfileModal() {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const { type, isModalOpen, data } = useSelector((state) => state.modal);
  // const userId = data?.userId;
  const userId = "656a09440d4cf47368a6dd6c";

  useEffect(() => {
    //fetch userData
  }, [userId]);

  return (
    <div
      className={`absolute z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-80 flex items-center justify-center ${
        isModalOpen && type === modalTypes.USER_PROFILE && userId !== id
          ? "block"
          : "hidden"
      }`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          dispatch(onModalClose());
        }
      }}>
      <div
        ref={modalRef}
        className="absolute w-[360px] bg-pearl-200 dark:bg-shadow-400 rounded-md">
        <div className="p-4 rounded-T-md">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="lg"
          />
        </div>
        <div className="bg-gray-900 p-4 rounded-b-md">
          <p className="text-xl font-semibold text-pearl-500">Lorem das ds</p>
          <p className="font-semibold text-sm text-pearl-900">Lorem@das134</p>
          <div className="my-4 bg-pearl-200 dark:bg-shadow-400 h-[1px]" />
          <Button
            color="blue"
            size="sm"
            className="flex justify-center items-center gap-2 capitalize"
            onClick={() => {
              <Navigate to={`/channels/@me/${userId}`} />;
            }}>
            Start conversation
            <MessageCirclePlus size={16} strokeWidth={2.75} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
