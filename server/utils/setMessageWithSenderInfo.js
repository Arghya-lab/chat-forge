const User = require("../models/User");

const setMessageWithSenderInfo = async (message) => {
  try {
    if (!message) return null;

    const sender = await User.findById(message.senderId);
    if (!sender) return null;

    return {
      id: message._id,
      content: message.content,
      fileUrls: message.fileUrls,
      channelId: message.channelId,
      deleted: message.deleted,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      senderId: message.senderId,
      senderName: sender.displayName,
      senderDp: sender.imgUrl,
      senderAvatarColor: sender.avatarColor,
    };
  } catch (error) {
    // Handle errors from User.findById
    return null;
  }
};

module.exports = setMessageWithSenderInfo;
