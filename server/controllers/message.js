const Channel = require("../models/Channel");
const Member = require("../models/Member");
const Message = require("../models/Message");
const Server = require("../models/Server");
const User = require("../models/User");
const { emitSocketEvent } = require("../socket");
const eventEnum = require("../socket/eventEnum");

//  function to return message data with sender detail
const setMessageWithSenderInfo = async (message) => {
  if (!message) return null;

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
};

//    ----------  CREATE  ----------     //
//  creating a new message
const createMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    if (!(await Channel.findById(channelId))) {
      return res.status(404).send("Chat doesn't exist");
    }

    const newMessage = await Message.create({
      content,
      senderId: userId,
      channelId,
    });

    const data = await setMessageWithSenderInfo(newMessage);

    // emit the new message event to the other participants with newMessage as the payload
    emitSocketEvent(req, channelId, eventEnum.MESSAGE_RECEIVED_EVENT, data);

    res.status(201).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while saving message.");
  }
};

//    ----------  READ  ----------     //
//  get all messages of a user
const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { userId } = req.user;
    const { firstMsgIdx = 0 } = req.query;
    const perPageMsgQty = 30;

    //  if user not exist
    if (!(await User.findById(userId)))
      return res.status(404).send("User doesn't exist.");

    //  if channel or conversation not exist
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).send("Chat room doesn't exist.");

    //  if user not joined in server
    if (!(await Member.find({ serverId: channel.serverId, userId })))
      return res.status(404).send("User not present in the server.");

    const messages = await Message.find({ channelId })
      .sort({ createdAt: -1 })
      .skip(firstMsgIdx)
      .limit(perPageMsgQty);

    const data = await Promise.all(
      messages.map(async (message) => {
        return await setMessageWithSenderInfo(message);
      })
    );

    const totalMessage = await Message.find({
      channelId,
    }).countDocuments();

    res.status(200).json({ messages: data, totalMessage });
  } catch (error) {
    return res.status(500).send("Error occur while fetching messages.");
  }
};

//    ----------  UPDATE  ----------     //
//  edit a message by owner or admin or moderator
const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    //  if user not exist
    if (!(await User.findById(userId)))
      return res.status(404).send("User doesn't exist.");

    //  if message not exist
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).send("Message doesn't exist.");

    //  if user isn't admin or moderator or sender
    const server = Server.findOne({ channels: { $in: [message.channelId] } });
    const member = Member.findOne({ userId, serverId: server.id });
    if (
      !(
        ["admin", "moderator"].includes(member.role) ||
        message.senderId.toString() === userId
      )
    ) {
      return res
        .status(400)
        .send("You are unauthorize to perform this action.");
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    const data = await setMessageWithSenderInfo(updatedMessage);

    // emit the edited message event to the other participants with updated message as the payload
    emitSocketEvent(
      req,
      message.channelId.toString(),
      eventEnum.MESSAGE_EDITED_EVENT,
      data
    );

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while editing message.");
  }
};

//    ----------  DELETE  ----------     //
//  delete a message by owner or admin or moderator
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.user;

    //  if user not exist
    if (!(await User.findById(userId)))
      return res.status(404).send("User doesn't exist.");

    //  if message not exist
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).send("Message doesn't exist.");

    //  if user isn't admin or moderator or sender
    const server = Server.findOne({ channels: { $in: [message.channelId] } });
    const member = Member.findOne({ userId, serverId: server.id });
    if (
      !(
        ["admin", "moderator"].includes(member.role) ||
        message.senderId.toString() === userId
      )
    ) {
      return res
        .status(400)
        .send("You are unauthorize to perform this action.");
    }

    const deletedMessage = await Message.findByIdAndUpdate(
      messageId,
      { deleted: true },
      { new: true }
    );

    const data = await setMessageWithSenderInfo(deletedMessage);

    // emit the deleted message event to the other participants with deleted message as the payload
    emitSocketEvent(
      req,
      message.channelId.toString(),
      eventEnum.MESSAGE_DELETED_EVENT,
      data
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error occur while deleting message.");
  }
};

module.exports = { createMessage, getMessages, editMessage, deleteMessage };
