import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import { PlusCircle, SendHorizontal } from "lucide-react";
import { sendMessage } from "../../features/message/messageSlice";
import EmojiPicker from "./EmojiPicker";
import { sendDirectMessage } from "../../features/directMessages/directMessagesSlice";

function ChatInput() {
  const params = useParams(); //  :serverId/:channelId

  const dispatch = useDispatch();
  const { selectedChannel, currentConversation } = useSelector(
    (state) => state.selected
  );

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "*",
    maxFiles: 12,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(newFiles);
    },
    noClick: true,
  });

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Perform your action when Enter is pressed without Shift
      event.preventDefault();
      handleSubmit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setContent("");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", content);
    for (const file of files) {
      formData.append("file", file);
    }
    if (params.serverId === "@me") {
      if (currentConversation?.userId) {
        dispatch(
          sendDirectMessage({
            formData,
            receiverId: currentConversation.userId,
          })
        );
      } else {
        dispatch(sendDirectMessage({ formData, receiverId: params.channelId }));
      }
    } else if (params.serverId) {
      dispatch(sendMessage(formData));
    }
    setContent("");
    setFiles([]);
  };

  return (
    <div className="mb-6">
      <div className="mx-4  max-h-72 bg-pearl-300 dark:bg-gray-800 rounded-lg overflow-y-scroll scrollbar scrollbar-2-light dark:scrollbar-2-dark">
        {files.length !== 0 && (
          <div className="m-4 flex gap-4 flex-wrap">
            {files.map((file) => {
              const { type, name, preview } = file;
              const extension = type.split("/")[type.split("/").length - 1];

              return (
                <div
                  key={name}
                  className="h-48 w-48 px-2 pt-6 rounded-md bg-neutral-300 dark:bg-shadow-200 pb-3 flex flex-col justify-between">
                  {type.split("/")[0] === "image" ? (
                    <div>
                      <img src={preview} className="h-32 w-44 object-contain" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="h-24 w-24">
                        <FileIcon
                          extension={extension}
                          {...defaultStyles[extension]}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap text-xs text-shadow-700 dark:text-pearl-700">
                    {name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <form className="flex gap-1 relative" onSubmit={() => handleSubmit}>
          {/* file upload btn */}
          <div className="" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div
              className="py-3 px-2 ml-2 sticky top-0 cursor-pointer text-gray-700 dark:text-neutral-400 hover:text-shadow-800 dark:hover:text-pearl-900"
              onClick={open}>
              <PlusCircle />
            </div>
          </div>
          {/* content input */}
          <Textarea
            className="flex-1 pb-0 pt-3 pl-0 min-h-[12px] bg-pearl-300 dark:bg-gray-800 rounded-lg border-none text-shadow-200 dark:text-pearl-50 focus:outline-none overflow-x-hidden whitespace-pre-wrap break-word"
            id="content"
            name="content"
            maxLength={4096}
            minLength={1}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            placeholder={
              params.serverId === "@me"
                ? `Message @ ${currentConversation?.displayName}`
                : `Message # | ${selectedChannel?.name || ""}`
            }
            rows={content.split("\n").length}
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {/* emoji picking btn */}
          <EmojiPicker addEmoji={setContent} />
          {/* send message btn */}
          <div className="py-3 mr-2">
            <SendHorizontal
              className="sticky top-0 text-gray-700 dark:text-neutral-400 hover:text-teal-700 dark:hover:text-green-600"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
