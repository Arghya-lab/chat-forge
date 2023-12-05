import { useRef, useState } from "react";
import axios, { authHeader } from "../../utils/axios";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import InviteLinkModal from "./InviteLinkModal";

const serverId = "656da200c8365be8804253f8";

function Header() {
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);

  const [inviteCode, setInviteCode] = useState(null);

  const handleInvitePeople = async () => {
    try {
      const res = await axios.get(`/server/inviteLink/${serverId}`, authHeader);
      setInviteCode(res.data.inviteCode);
      setOpenLinkModal(true);
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className="w-full px-4 py-3 flex justify-between items-center border-b-2 border-pearl-600 dark:border-shadow-900 shadow-sm cursor-pointer hover:bg-pearl-300 dark:hover:bg-shadow-300"
        onClick={() => setOpen(true)}>
        <h6 className="font-semibold text-shadow-900 dark:text-pearl-800">
          CraftingMiners
        </h6>
        <ChevronDown
          size={20}
          className="text-shadow-900 dark:text-pearl-800"
        />
      </div>
      {/* Modal */}
      <div
        className={`absolute top-0 left-0 bottom-0 right-0 bg-transparent ${
          open ? "block" : "hidden"
        }`}
        onClick={(e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpen(false);
          }
        }}>
        <div
          ref={modalRef}
          className="relative top-14 left-20 z-20 w-56 p-2 bg-pearl-500 dark:bg-neutral-900 rounded-md">
          <div
            className="serverActionBtn text-indigo-800 dark:text-indigo-300 hover:bg-indigo-500 hover:text-pearl-50 dark:hover:text-pearl-50"
            onClick={handleInvitePeople}>
            <p>Invite People</p>
            <UserPlus size={18} />
          </div>
          <div className="serverActionBtn text-shadow-400 dark:text-pearl-900 hover:bg-indigo-500 hover:text-pearl-50 dark:hover:text-pearl-50">
            <p>Server Setting</p>
            <Settings size={18} />
          </div>
          <div className="serverActionBtn text-shadow-400 dark:text-pearl-900 hover:bg-indigo-500 hover:text-pearl-50 dark:hover:text-pearl-50">
            <p>Manage Members</p>
            <Users size={18} />
          </div>
          <div className="serverActionBtn text-shadow-400 dark:text-pearl-900 hover:bg-indigo-500 hover:text-pearl-50 dark:hover:text-pearl-50">
            <p>Create Channel</p>
            <PlusCircle size={18} />
          </div>
          <div className="serverActionBtn text-red-800 dark:text-red-600 hover:bg-red-600 hover:text-pearl-50 dark:hover:text-pearl-50">
            <p>Delete Server</p>
            <Trash size={18} />
          </div>
        </div>
      </div>
      <InviteLinkModal
        openLinkModal={openLinkModal}
        setOpenLinkModal={setOpenLinkModal}
        inviteCode={inviteCode}
        setInviteCode={setInviteCode}
      />
    </div>
  );
}

export default Header;
