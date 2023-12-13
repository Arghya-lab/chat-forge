const Channel = require("../models/Channel");
const Member = require("../models/Member");
const Message = require("../models/Message");
const User = require("../models/User");
const { emitSocketEvent } = require("../socket");
const eventEnum = require("../socket/eventEnum");

//    ----------  CREATE  ----------     //
//  creating a new message
const createMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    if (!(await Channel.findById(roomId))) {
      return res.status(404).send("Chat doesn't exist");
    }

    const newMessage = await Message.create({
      content,
      senderId: userId,
      channelId: roomId,
    });

    const sender = await User.findById(userId);

    const data = {
      id: newMessage._id,
      content: newMessage.content,
      fileUrl: newMessage.fileUrl,
      channelId: newMessage.channelId,
      deleted: newMessage.deleted,
      createdAt: newMessage.createdAt,
      updatedAt: newMessage.updatedAt,
      senderId: newMessage.senderId,
      senderName: sender.displayName,
      senderDp: sender.imgUrl,
      senderAvatarColor: sender.avatarColor,
    };

    // emit the new message event to the other participants with newMessage as the payload
    emitSocketEvent(req, roomId, eventEnum.MESSAGE_RECEIVED_EVENT, data);

    res.status(201).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while saving message.");
  }
};

//    ----------  READ  ----------     //
//  get all messages of a user
const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.user;
    const { firstMsgIdx = 0 } = req.query;
    const perPageMsgQty = 30;

    //  if user not exist
    if (!(await User.findById(userId)))
      return res.status(404).send("User doesn't exist.");

    //  if channel or conversation not exist
    const channel = await Channel.findById(roomId);
    if (!channel) return res.status(404).send("Chat room doesn't exist.");

    //  if user not joined in server
    if (!(await Member.find({ serverId: channel.serverId, userId })))
      return res.status(404).send("User not present in the server.");

    const messages = await Message.find({ channelId: roomId })
      .sort({ createdAt: -1 })
      .skip(firstMsgIdx)
      .limit(perPageMsgQty);

    const data = await Promise.all(
      messages.map(async (message) => {
        const sender = await User.findById(message.senderId);

        return {
          id: message._id,
          content: message.content,
          fileUrl: message.fileUrl,
          channelId: message.channelId,
          deleted: message.deleted,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
          senderId: message.senderId,
          senderName: sender.displayName,
          senderDp: sender.imgUrl,
          senderAvatarColor: sender.avatarColor,
        };
      })
    );

    const totalMessage = await Message.find({
      channelId: roomId,
    }).countDocuments();

    res.status(200).json({ messages: data, totalMessage });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error occur while fetching message.");
  }
};

module.exports = { createMessage, getMessages };
