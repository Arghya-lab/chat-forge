import { io } from "socket.io-client";

const initializeSocketClient = () => {
    const localStorageParsedData = JSON.parse(localStorage.getItem("chatForge"));
    const token = localStorageParsedData?.auth?.token || null;

    const socket = io.connect("http://localhost:8000", {
      withCredentials: true,
      auth: {
        token,
      },
    });

  return socket;
};

export default initializeSocketClient;


