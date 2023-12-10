import { Chip } from "@material-tailwind/react";
import { Hash } from "lucide-react";

function Header() {
  return (
    <div className="w-full px-6 py-3 flex justify-between items-center min-h-[56px] border-b-2 border-pearl-600 dark:border-shadow-900 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">
          {/* {channel.type === "text" ? ( */}
          <Hash size={26} strokeWidth={2.25} />
          {/* ) : channel.type === "voice" ? ( */}
          {/* <AudioWaveform size={16} strokeWidth={2.5} /> */}
          {/* ) : ( */}
          {/* <Video size={16} strokeWidth={2.5} /> */}
          {/* )} */}
        </div>
        <h6 className="font-semibold text-shadow-900 dark:text-pearl-100">
          | My Server
          {/* {server.name} */}
        </h6>
      </div>
      <div className="dark:bg-gray-500 rounded-md">
        <Chip
          variant="ghost"
          size="sm"
          value="Connected"
          // value="Connecting"
          // value="Error"
          icon={
            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-700" />
            // <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-orange-700" />
            // <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-700" />
          }
        />
      </div>
    </div>
  );
}

export default Header;
