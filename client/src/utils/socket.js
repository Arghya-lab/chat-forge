import { io } from "socket.io-client";

  const localStorageParsedData = JSON.parse(localStorage.getItem("chatForge"));
  const token = localStorageParsedData?.auth?.token || null;

  const socket = io(`http://localhost:8000`, {
    withCredentials: true,
    auth: {
      token
    },
  });
export default socket;
