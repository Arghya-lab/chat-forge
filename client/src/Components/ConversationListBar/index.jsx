import ConversationList from "./ConversationList";
import ProfileContainer from "../ChannelListBar/ProfileContainer";
import { onModalOpen } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import modalTypes from "../../modalTypes";

function ConversationListBar() {
  const dispatch = useDispatch();
  return (
    <div className="w-60 h-screen bg-pearl-200 dark:bg-shadow-400 flex flex-col">
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* User search btn */}
        <div className="flex justify-center w-full h-[56px]">
          <div className="w-full p-3 flex justify-between items-center border-b-2 border-pearl-600 dark:border-shadow-900 shadow-sm">
            <div
              className="w-full h-full pl-3 rounded cursor-pointer flex justify-between items-center bg-pearl-500 dark:bg-shadow-900"
              onClick={() =>
                dispatch(onModalOpen({ type: modalTypes.USER_SEARCH }))
              }>
              <p className="text-xs text-shadow-900 dark:text-neutral-200">
                Find user by userId
              </p>
            </div>
          </div>
        </div>
        {/* Conversation list */}
        <ConversationList />
      </div>
      <ProfileContainer />
    </div>
  );
}

export default ConversationListBar;
