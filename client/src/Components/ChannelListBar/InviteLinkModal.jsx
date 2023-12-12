import { useRef } from "react";
import PropTypes from "prop-types";
import axios, { authHeader } from "../../utils/axios";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

function InviteLinkModal({
  openLinkModal,
  setOpenLinkModal,
  inviteCode,
  setInviteCode,
}) {
  const serverId = useSelector(state=>state.selected.server?.id)

  const modalRef = useRef(null);
  const linkRef = useRef(null);
  const copyBtnRef = useRef(null);
  const generateBtnRef = useRef(null);

  const handleCopyLink = () => {
    const link = linkRef.current.value;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        copyBtnRef.current.classList.add("bg-green-600", "hover:bg-green-700");
        copyBtnRef.current.innerText = "Copied";
        setTimeout(() => {
          copyBtnRef.current.classList.remove(
            "bg-green-600",
            "hover:bg-green-700"
          );
          copyBtnRef.current.innerText = "Copy";
        }, 3000);
      })
      .catch(() => {
        console.log("Error occur while coping link");
      });
  };

  const handleLinkGenerate = async () => {
    try {
      const res = await axios.post(
        `server/inviteLink/${serverId}`,
        {},
        authHeader
      );
      setInviteCode(res.data.inviteCode);
      generateBtnRef.current.classList.add("bg-teal-600", "hover:bg-teal-700");
      generateBtnRef.current.innerText = "Generated";
      setTimeout(() => {
        generateBtnRef.current.classList.remove(
          "bg-teal-600",
          "hover:bg-teal-700"
        );
        generateBtnRef.current.innerText = "Generate";
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-80 flex items-center justify-center ${
        openLinkModal ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setOpenLinkModal(false);
        }
      }}>
      <div
        ref={modalRef}
        className="w-[448px] bg-pearl-200 dark:bg-neutral-800 rounded-md">
        <div className="relative">
          <h5 className="text-lg font-semibold p-4 text-neutral-900 dark:text-pearl-100">
            Invite friends to CraftyMines
          </h5>
          <div
            className="absolute right-4 top-4 text-neutral-400 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-100"
            onClick={() => setOpenLinkModal(false)}>
            <X strokeWidth={2} size={26} />
          </div>
          <div className="px-4 pb-6">
            <p className="pb-4 text-xs dark:text-pearl-800">
              Share this link with others to grant access to this server
            </p>
            <div className="flex items-center bg-pearl-600 dark:bg-shadow-900 p-1 rounded">
              <input
                className="flex-grow rounded-sm border-none p-2 h-8 text-md bg-pearl-600 dark:bg-shadow-900 text-neutral-900 dark:text-pearl-500 focus:outline-none"
                type="text"
                value={`${
                  import.meta.env.VITE_WEBSITE_BASE_URL
                }/invite/${inviteCode}`}
                ref={linkRef}
                readOnly
              />
              <button
                className="w-20 h-8 bg-blue-800 hover:bg-blue-900 text-pearl-50 text-sm rounded"
                ref={copyBtnRef}
                onClick={handleCopyLink}>
                Copy
              </button>
            </div>
            <div className="flex mt-4 mb-2 items-center bg-pearl-600 dark:bg-shadow-900 p-1 rounded">
              <p className="text-md pl-2 flex-grow rounded-sm bg-pearl-600 dark:bg-shadow-900 text-neutral-900 dark:text-pearl-500 focus:outline-none">
                Generate new invite link
              </p>
              <button
                className="px-4 h-8 bg-yellow-900 hover:bg-yellow-800 text-pearl-50 text-sm rounded"
                ref={generateBtnRef}
                onClick={handleLinkGenerate}>
                Generate
              </button>
            </div>
            <p className="text-xs dark:text-pearl-800">
              <span className="text-base text-red-700 font-semibold">
                Caution:
              </span>
              &nbsp; if you generate new invite link the old link will not work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

InviteLinkModal.propTypes = {
  openLinkModal: PropTypes.bool.isRequired,
  setOpenLinkModal: PropTypes.func.isRequired,
  inviteCode: PropTypes.string,
  setInviteCode: PropTypes.func.isRequired,
};

export default InviteLinkModal;
