import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addServer } from "../../features/servers/serversSlice";

function ServerInvitePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inviteCode } = useParams();

  useEffect(() => {
    dispatch(addServer(inviteCode));
    // show error on wrong invite code
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className="text-lg font-semibold mt-36 text-center text-red-400 dark:bg-black">
      Redirecting to app.......
    </p>
  );
}

export default ServerInvitePage;
