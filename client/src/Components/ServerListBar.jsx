/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import {
  MessageSquare,
  MessageSquareDashed,
  Moon,
  Plus,
  Sun,
  SunMoon,
} from "lucide-react";
import { setSelectedMode } from "../features/info/infoSlice";
import { Tooltip } from "@material-tailwind/react";
import CreateServerForm from "./CreateServerForm";
import { setServers } from "../features/servers/serversSlice";

const modes = [
  {
    name: "Auto",
    value: "auto",
    element: <SunMoon size={28} />,
  },
  {
    name: "Light",
    value: "light",
    element: <Sun size={28} />,
  },
  {
    name: "Dark",
    value: "dark",
    element: <Moon size={28} />,
  },
];
function ServerListBar() {
  const dispatch = useDispatch();

  const { selectedMode } = useSelector((state) => state.info);
  const { servers } = useSelector((state) => state.servers);
  const { token } = useSelector(state=>state.auth)

  const [selectedItem, setSelectedItem] = useState("directMessage");
  const [hoverItem, setHoverItem] = useState(null);
  const [openCreateServerForm, setOpenCreateServerForm] = useState(false);

  const handleCreateServerBtnClick = () => {
    setSelectedItem("createServer");
    setOpenCreateServerForm(true);
  };

  const handleModeChange = () => {
    dispatch(setSelectedMode((selectedMode + 1) % modes.length));
  };

  useEffect(() => {
    (async()=>
    {try {
      const res = await axios.get("/server",{headers: {
        "Authorization": token
      }});
      dispatch(setServers(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }})()
  }, [])

  return (
    <div className="pt-3 w-[72px] h-screen flex item-center flex-col bg-pearl-300 dark:bg-shadow-900 overflow-y-scroll  no-scrollbar">
      {/* Direct Messages */}
      <div className="flex items-center flex-col">
        <Tooltip content="Direct Messages" placement="right">
          <div
            className="mb-3 w-full flex items-center justify-center relative cursor-pointer"
            onPointerEnter={() => setHoverItem("directMessage")}
            onPointerLeave={() => setHoverItem(null)}>
            <div
              className={`w-1 rounded-r-md bg-neutral-700 dark:bg-neutral-200 absolute left-0 transition-height duration-300 ease-in-out ${
                selectedItem === "directMessage"
                  ? "h-10"
                  : hoverItem === "directMessage"
                  ? "h-5"
                  : "h-0"
              }`}
            />
            <div
              className={`transition-shape duration-300 ease-in-out ${
                selectedItem === "directMessage" ||
                hoverItem === "directMessage"
                  ? "rounded-2xl bg-blue-800"
                  : "rounded-full bg-shadow-200"
              } w-12 h-12 flex items-center justify-center`}
              onClick={() => setSelectedItem("directMessage")}>
              {selectedItem === "directMessage" ||
              hoverItem === "directMessage" ? (
                <MessageSquare className="text-gray-100" size={28} />
              ) : (
                <MessageSquareDashed className="text-gray-400" size={28} />
              )}
            </div>
          </div>
        </Tooltip>
        <div className="mb-3 h-[2px] w-8 rounded-sm bg-neutral-200 dark:bg-shadow-100 " />
      </div>
      {/* Servers */}
      {servers.map((server) => (
        <Tooltip key={server.id} content={server.name} placement="right">
          <div
            className="mb-3 w-full flex items-center justify-center relative cursor-pointer"
            onPointerEnter={() => setHoverItem(server.id)}
            onPointerLeave={() => setHoverItem(null)}
            onClick={() => setSelectedItem(server.id)}>
            <div
              className={`w-1 rounded-r-md bg-neutral-700 dark:bg-neutral-200 absolute left-0 transition-height duration-300 ease-in-out ${
                selectedItem === server.id
                  ? "h-10"
                  : hoverItem === server.id
                  ? "h-5"
                  : "h-2"
              }`}
            />
            <img
              src={`${import.meta.env.VITE_IMG_BASE_URL}/server_imgs/${server.imgUrl}`}
              height={48}
              width={48}
              className={`transition-shape duration-300 ease-in-out ${
                selectedItem === server.id || hoverItem === server.id
                  ? "rounded-2xl"
                  : "rounded-full"
              } w-12 h-12 object-cover flex items-center justify-center`}
            />
          </div>
        </Tooltip>
      ))}
      {/* Create Server Button */}
      <Tooltip content="Create Server" placement="right">
        <div
          className="mb-3 w-full flex items-center justify-center relative cursor-pointer"
          onPointerEnter={() => setHoverItem("createServer")}
          onPointerLeave={() => setHoverItem(null)}
          onClick={handleCreateServerBtnClick}>
          <div
            className={`transition-shape duration-300 ease-in-out ${
              selectedItem === "createServer" || hoverItem === "createServer"
                ? "rounded-2xl bg-teal-500"
                : "rounded-full bg-neutral-100 dark:bg-shadow-400"
            } w-12 h-12 flex items-center justify-center`}>
            <Plus
              className={`${
                selectedItem === "createServer" || hoverItem === "createServer"
                  ? "text-white"
                  : "text-teal-500"
              }`}
              size={28}
            />
          </div>
        </div>
      </Tooltip>
      <CreateServerForm
        openCreateServerForm={openCreateServerForm}
        setOpenCreateServerForm={setOpenCreateServerForm}
        setSelectedItem={setSelectedItem}
      />
      {/* Change Mode Button */}
      <Tooltip content={modes[selectedMode].name} placement="right">
        <div
          className="mb-3 w-full flex items-center justify-center relative cursor-pointer"
          onPointerEnter={() => setHoverItem("modeChange")}
          onPointerLeave={() => setHoverItem(null)}
          onClick={handleModeChange}>
          <div
            className={`transition-shape duration-300 ease-in-out ${
              hoverItem === "modeChange"
                ? "rounded-2xl bg-teal-500"
                : "rounded-full bg-neutral-100 dark:bg-shadow-400"
            } w-12 h-12 flex items-center justify-center`}>
            <div
              className={`${
                hoverItem === "modeChange" ? "text-white" : "text-teal-500"
              }`}>
              {modes[selectedMode].element}
            </div>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default ServerListBar;
