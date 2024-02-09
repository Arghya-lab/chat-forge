const Conversation = require("../models/Conversation");
const DirectMessage = require("../models/DirectMessage");
const User = require("../models/User");
const { emitSocketEvent } = require("../socket");
const eventEnum = require("../socket/eventEnum");

const formatDirectMessage = async (message) => {
  if (!message) return null;

  const sender = await User.findById(message.senderId);
  if (!sender) return null;

  return {
    id: message._id,
    content: message.content,
    fileUrls: message.fileUrls,
    senderId: message.senderId,
    deleted: message.deleted,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,

    senderName: sender.displayName,
    senderDp: sender.imgUrl,
    senderAvatarColor: sender.avatarColor,
  };
};

//    ----------  CREATE  ----------     //
//  creating a new message
const createDirectMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;
    const fileUrls = req.fileUrls;

    let isNewChat = false;

    if (!((await User.findById(receiverId)) && (await User.findById(userId)))) {
      return res.status(404).send("User doesn't exist");
    }
    if (userId === receiverId) {
      return res.status(404).send("You can't chat with your self.");
    }

    let conversation = await Conversation.findOne({
      userOneId: { $in: [userId, receiverId] },
      userTwoId: { $in: [userId, receiverId] },
    });

    if (!conversation) {
      isNewChat = true;

      conversation = await Conversation.create({
        userOneId: userId,
        userTwoId: receiverId,
      });
    }
    const newDirectMessage = await DirectMessage.create({
      content,
      fileUrls,
      senderId: userId,
      conversationId: conversation._id,
    });

    const data = await formatDirectMessage(newDirectMessage);

    if (isNewChat) {
      const conversationUser = await User.findById(userId).select(
        "displayName userName imgUrl avatarColor"
      );
      const formattedConversationUser = {
        userId: conversationUser._id,
        displayName: conversationUser.displayName,
        userName: conversationUser.userName,
        imgUrl: conversationUser.imgUrl,
        avatarColor: conversationUser.avatarColor,
        newReceivedMessages: 1,
      };

      // emit the new direct chat event to the receiver with newMessage as the payload
      emitSocketEvent(req, receiverId, eventEnum.NEW_DIRECT_CHAT_EVENT, {
        message: data,
        conversation: formattedConversationUser,
      });
    } else {
      // emit the new direct message event to the receiver with newMessage as the payload
      emitSocketEvent(
        req,
        receiverId,
        eventEnum.DIRECT_MESSAGE_RECEIVED_EVENT,
        data
      );
    }

    res.status(201).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while saving message.");
  }
};

//    ----------  READ  ----------     //
//  get all messages of a user
const getDirectMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { userId } = req.user;
    const { firstMsgIdx = 0 } = req.query;
    const perPageMsgQty = 30;

    if (!((await User.findById(receiverId)) && (await User.findById(userId)))) {
      return res.status(404).send("User doesn't exist");
    }
    if (userId === receiverId) {
      return res.status(404).send("You can't chat with your self.");
    }

    const conversation = await Conversation.findOne({
      userOneId: { $in: [userId, receiverId] },
      userTwoId: { $in: [userId, receiverId] },
    });
    if (!conversation) {
      return res.status(200).json({ messages: [], totalMessage: 0 });
    }

    const messages = await DirectMessage.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .skip(firstMsgIdx)
      .limit(perPageMsgQty);

    const data = await Promise.all(
      messages.map(async (message) => {
        return await formatDirectMessage(message);
      })
    );

    const totalMessage = await DirectMessage.find({
      conversationId: conversation._id,
    }).countDocuments();

    res.status(200).json({ messages: data, totalMessage });
  } catch (error) {
    return res.status(500).send("Error occur while fetching messages.");
  }
};

//    ----------  UPDATE  ----------     //
//  edit a message
const editDirectMessage = async (req, res) => {
  try {
    const { directMessageId } = req.params;
    const { content } = req.body;
    const { userId: senderId } = req.user;

    //  if user not exist
    if (!(await User.findById(senderId)))
      return res.status(404).send("User doesn't exist.");

    //  if message not exist
    const directMessage = await DirectMessage.findById(directMessageId);
    if (!directMessage) return res.status(404).send("Message doesn't exist.");

    if (directMessage.senderId.toString() !== senderId) {
      return res
        .status(400)
        .send("You are unauthorize to perform this action.");
    }

    const conversation = await Conversation.findById(
      directMessage.conversationId
    );
    const receiverId = [conversation.userOneId, conversation.userTwoId]
      .filter((userId) => userId.toString() !== senderId)
      .toString();

    // update msg content in db
    const updatedDirectMessage = await DirectMessage.findByIdAndUpdate(
      directMessageId,
      { content },
      { new: true }
    );

    const data = await formatDirectMessage(updatedDirectMessage);
    // emit the edited message event to the receiver with updated message as the payload
    emitSocketEvent(
      req,
      receiverId,
      eventEnum.DIRECT_MESSAGE_EDITED_EVENT,
      data
    );

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while editing message.");
  }
};

//    ----------  DELETE  ----------     //
//  delete a message by sender
const deleteDirectMessage = async (req, res) => {
  try {
    const { directMessageId } = req.params;
    const { userId: senderId } = req.user;

    //  if user not exist
    if (!(await User.findById(senderId)))
      return res.status(404).send("User doesn't exist.");

    //  if message not exist
    const directMessage = await DirectMessage.findById(directMessageId);
    if (!directMessage) return res.status(404).send("Message doesn't exist.");

    if (directMessage.senderId.toString() !== senderId) {
      return res
        .status(400)
        .send("You are unauthorize to perform this action.");
    }

    const conversation = await Conversation.findById(
      directMessage.conversationId
    );
    const receiverId = [conversation.userOneId, conversation.userTwoId]
      .filter((userId) => userId.toString() !== senderId)
      .toString();

    const deletedDirectMessage = await DirectMessage.findByIdAndUpdate(
      directMessageId,
      { deleted: true },
      { new: true }
    );

    const data = await formatDirectMessage(deletedDirectMessage);

    // emit the deleted message event to the other participants with deleted message as the payload
    emitSocketEvent(
      req,
      receiverId,
      eventEnum.DIRECT_MESSAGE_DELETED_EVENT,
      data
    );

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("Error occur while deleting message.");
  }
};

module.exports = {
  createDirectMessage,
  getDirectMessages,
  editDirectMessage,
  deleteDirectMessage,
};
