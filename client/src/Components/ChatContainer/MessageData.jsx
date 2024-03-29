import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";
// import { Tooltip } from "@material-tailwind/react";
import EditForm from "./EditForm";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useParams } from "react-router-dom";

function MessageData({ message }) {
  const serverId = useParams().serverId; //  :serverId/:channelId
  const isDirectMessages = serverId === "@me";

  const { editingMessage, editingDirectMessage } = useSelector(
    (state) => state.selected
  );

  const isDeleted = message.deleted;
  const isEditing = isDirectMessages
    ? editingDirectMessage?.id != message?.id
    : editingMessage?.id != message?.id;
  const isFilePresent = message?.fileUrls.length !== 0;

  if (isDeleted) {
    return <span className="text-md italic text-gray-500">(deleted)</span>;
  } else {
    return (
      <div className="w-full">
        {isFilePresent && (
          <div className="flex flex-col">
            {message.fileUrls.map((fileUrl, id) => {
              const fileExtension = fileUrl.split(".").pop();
              const fileName =
                fileUrl.split("-").slice(0, -2).join("-") + "." + fileExtension;

              return (
                <div
                  key={id}
                  className="p-4 mb-2 rounded-lg min-w-fit max-w-[72%] flex items-center bg-pearl-200 dark:bg-shadow-400 border-[1px] border-pearl-500 dark:border-shadow-700">
                  <div className="h-8 w-8 mr-2">
                    <FileIcon
                      extension={fileExtension}
                      {...defaultStyles[fileExtension]}
                    />
                  </div>
                  <div>
                    <a
                      className="whitespace-nowrap overflow-ellipsis font-serif text-blue-600 hover:underline"
                      href={`${
                        import.meta.env.VITE_FILE_BASE_URL
                      }/message_files/${fileUrl}`}
                      rel="noreferrer noopener"
                      target="_blank">
                      {fileName}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {isEditing ? (
          <div>
            <article className="text-md text-shadow-700 dark:text-pearl-800 break-words">
              <Markdown>{message?.content}</Markdown>
            </article>
            {message?.createdAt !== message?.updatedAt && (
              <span className="text-xs text-gray-500"> (edited)</span>
            )}
          </div>
        ) : (
          <EditForm />
        )}
      </div>
    );
  }
}

MessageData.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageData;
