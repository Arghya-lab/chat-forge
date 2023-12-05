import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { authHeader } from "../utils/axios";
import { addServer } from "../features/servers/serversSlice";

function ServerInvite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inviteCode } = useParams();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.patch(`server/${inviteCode}`, {}, authHeader);
        dispatch(addServer(res.data));
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setIsError(true);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isError ? (
    <p className="text-lg font-semibold mt-36 text-center text-red-400 dark:bg-black">
      Some thing went wrong.......
    </p>
  ) : null;
}

export default ServerInvite;
