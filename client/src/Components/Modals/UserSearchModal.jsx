import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios, { authHeader } from "../../utils/axios";
import { Avatar } from "@material-tailwind/react";
import { CircleUser } from "lucide-react";
import modalTypes from "../../modalTypes";
import { onModalClose } from "../../features/modal/modalSlice";
// import { setCurrentConversation } from "../../features/selected/selectedSlice";

function UserSearchModal() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const modalRef = useRef(null);
  const { type, isModalOpen } = useSelector((state) => state.modal);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length >= 3) {
      (async () => {
        try {
          const res = await axios.get(`/user/search/${query}`, authHeader);
          setSuggestions(res.data.users);
        } catch (error) {
          console.log(error.message);
        }
      })();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion);
    // dispatch(setCurrentConversation(suggestion));
    // dispatch(onModalClose());
    // navigate(`/channels/@me/${suggestion?.id}`);
  };

  return (
    <div
      className={`absolute z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 flex items-center justify-center ${
        isModalOpen && type === modalTypes.USER_SEARCH ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          dispatch(onModalClose());
        }
      }}>
      <div
        ref={modalRef}
        className="absolute w-[586px] p-5 mt-10 bg-pearl-200 dark:bg-shadow-400 rounded-md flex flex-col">
        <input
          className="px-4 h-16 w-full bg-shadow-900 text-neutral-200 text-xl focus:outline-none rounded-md"
          placeholder="Search user by userId"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="max-h-[240px] overflow-y-scroll scrollbar scrollbar-1-light dark:scrollbar-1-dark">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion?.id}
              className="flex flex-row gap-3 items-center my-2 px-2 py-1 rounded cursor-pointer hover:bg-pearl-400 dark:hover:bg-neutral-700"
              onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion?.imgUrl ? (
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="xs"
                />
              ) : (
                <CircleUser
                  size={24}
                  strokeWidth={1.75}
                  style={{ color: suggestion?.avatarColor }}
                />
              )}
              <div>
                <span className="pr-1 text-base text-shadow-300 dark:text-pearl-900 whitespace-nowrap">
                  {suggestion?.displayName}
                </span>
                <span className="text-base text-shadow-300 dark:text-neutral-400 whitespace-nowrap">
                  {suggestion?.userName}
                </span>
              </div>
            </div>
          ))}
        </div>
        {suggestions.length === 0 && query.length >= 3 && (
          <div
            className="bg-fixed bg-no-repeat bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_FILE_BASE_URL
              }/not_found_bg.svg)`,
            }}>
            <p className="text-center pt-40 pb-8 text-neutral-500">
              Can&apos;t seem to find what you&apos;re looking for?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearchModal;
