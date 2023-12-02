import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";
import {
  MessageSquare,
  MessageSquareDashed,
  Moon,
  Plus,
  Sun,
  SunMoon,
} from "lucide-react";
import { setSelectedMode } from "../features/info/infoSlice";

const servers = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qCreqkTZL0F0bF9kZctFE1XVFocO__70kw&usqp=CAU",
    id: "1",
    name: "Phenix",
  },
  {
    img: "https://i.pinimg.com/736x/75/8e/25/758e25771eebb47062f6ebb067a8fd51.jpg",
    id: "2",
    name: "crazy gamers",
  },
  {
    img: "https://i.pinimg.com/736x/1c/2a/fd/1c2afd5df5bc136bfbae9ce51386cd5f.jpg",
    id: "3",
    name: "Beauty",
  },
  {
    img: "	https://i.pinimg.com/736x/c6/38/c7/c638c7e9ab7eea29f0b88e2c88ba2254.jpg",
    id: "4",
    name: "flamingo",
  },
  {
    img: "	https://i.pinimg.com/236x/e7/5f/66/e75f668018101587bc1a62cf33902046.jpg",
    id: "5",
    name: "Dolphine",
  },
];

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
  const [openItem, setOpenItem] = useState("directMessage");
  const [hoverItem, setHoverItem] = useState(null);

  const handleModeChange = () => {
    dispatch(setSelectedMode((selectedMode + 1) % modes.length));
  };

  return (
    <div className="pt-3 w-[72px] h-screen flex item-center flex-col bg-pearl-300 dark:bg-shadow-900">
      {/* Direct Messages */}
      <div className="flex items-center flex-col">
        <Tooltip content="Direct Messages" placement="right">
          <div
            className="mb-3 w-full flex items-center justify-center relative cursor-pointer"
            onPointerEnter={() => setHoverItem("directMessage")}
            onPointerLeave={() => setHoverItem(null)}>
            <div
              className={`w-1 rounded-r-md bg-neutral-700 dark:bg-neutral-200 absolute left-0 transition-height duration-300 ease-in-out ${
                openItem === "directMessage"
                  ? "h-10"
                  : hoverItem === "directMessage"
                  ? "h-5"
                  : "h-0"
              }`}
            />
            <div
              className={`transition-shape duration-300 ease-in-out ${
                openItem === "directMessage" || hoverItem === "directMessage"
                  ? "rounded-2xl bg-blue-800"
                  : "rounded-full bg-shadow-200"
              } w-12 h-12 flex items-center justify-center`}
              onClick={() => setOpenItem("directMessage")}>
              {openItem === "directMessage" || hoverItem === "directMessage" ? (
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
            onClick={() => setOpenItem(server.id)}>
            <div
              className={`w-1 rounded-r-md bg-neutral-700 dark:bg-neutral-200 absolute left-0 transition-height duration-300 ease-in-out ${
                openItem === server.id
                  ? "h-10"
                  : hoverItem === server.id
                  ? "h-5"
                  : "h-2"
              }`}
            />
            <img
              src={server.img}
              height={48}
              width={48}
              className={`transition-shape duration-300 ease-in-out ${
                openItem === server.id || hoverItem === server.id
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
          onClick={() => setOpenItem("createServer")}>
          <div
            className={`transition-shape duration-300 ease-in-out ${
              openItem === "createServer" || hoverItem === "createServer"
                ? "rounded-2xl bg-teal-500"
                : "rounded-full bg-neutral-100 dark:bg-shadow-400"
            } w-12 h-12 flex items-center justify-center`}>
            <Plus
              className={`${
                openItem === "createServer" || hoverItem === "createServer"
                  ? "text-white"
                  : "text-teal-500"
              }`}
              size={28}
            />
          </div>
        </div>
      </Tooltip>
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
