import { Avatar } from "@material-tailwind/react";
import { Cog, Mic, MicOff, Volume1, VolumeX } from "lucide-react";
import { useSelector } from "react-redux";

function ProfileContainer() {
  const { displayName } = useSelector((state) => state.auth);
  return (
    <div className="h-14 flex items-center bg-pearl-500 dark:bg-neutral-900">
      <div className="mx-2 my-1 py-1 pr-1 w-1/2 flex items-center jus gap-1 hover:bg-pearl-50 dark:hover:bg-shadow-300 rounded cursor-pointer">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="sm"
        />
        <div>
          <p className="text-sm font-serif text-shadow-300 dark:text-pearl-300 whitespace-nowrap">
            {displayName}
          </p>
          <p className="text-xs font-serif text-shadow-100 dark:text-pearl-600">
            Developer jh
          </p>
        </div>
      </div>
      <div className="p-[6px] rounded-sm hover:bg-pearl-50 dark:hover:bg-shadow-300 text-shadow-100 dark:text-pearl-500 cursor-pointer">
        <Mic size={20} />
        {/* <MicOff size={20} /> */}
      </div>
      <div className="p-[6px] rounded-sm hover:bg-pearl-50 dark:hover:bg-shadow-300 text-shadow-100 dark:text-pearl-500 cursor-pointer">
        <Volume1 size={20} />
        {/* <VolumeX size={20} /> */}
      </div>
      <div className="p-[6px] rounded-sm hover:bg-pearl-50 dark:hover:bg-shadow-300 text-shadow-100 dark:text-pearl-500 cursor-pointer">
        <Cog size={20} />
      </div>
    </div>
  );
}

export default ProfileContainer;
