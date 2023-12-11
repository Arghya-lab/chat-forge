function MessageItem({
  content,
  deleted,
  createdAt,
  updatedAt,
  senderName,
  senderId,
  senderDp,
}) {
  return (
    <div className="mt-4 min-h-[44px] mr-10 flex">
      <div className="mx-4 w-10 h-10 flex-shrink-0">
        <img
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          // src={`${import.meta.env.VITE_IMG_BASE_URL}/server_imgs/${
          //   server.imgUrl
          // }`}
          width={40}
          height={40}
          className="rounded-full object-cover flex items-center justify-center"
        />
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="font-medium text-light-green-700">
            {senderName}
          </h3>
          {/* //  logo */}
          &nbsp;
          <span className="text-xs font-serif text-gray-500">
            {createdAt}
          </span>
        </div>
        <p className="text-sm text-pearl-800">{content}</p>
      </div>
    </div>
  );
}

export default MessageItem;
