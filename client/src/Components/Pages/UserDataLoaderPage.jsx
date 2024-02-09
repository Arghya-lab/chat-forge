import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { getUserServers } from "../../features/servers/serversSlice";
import { getConversations } from "../../features/directMessages/directMessagesSlice";

function UserDataLoaderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserServers()).then(() => {
      dispatch(getConversations()).then(() => {
        navigate("/channels/@me");
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <Loader2 className="h-24 w-24 text-shadow-700 dark:text-pearl-500 animate-spin my-4" />
    </div>
  );
}

export default UserDataLoaderPage;
