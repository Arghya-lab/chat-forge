const Channel = require("../models/Channel");
const Message = require("../models/Message");
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
      res.status(404).send("Chat does not exist");
    }

    const newMessage = await Message.create({
      content,
      senderId: userId,
      channelId: roomId,
    });
    // emit the new message event to the other participants with newMessage as the payload
    emitSocketEvent(req, roomId, eventEnum.MESSAGE_RECEIVED_EVENT, newMessage);

    res.status(201).json({ newMessage });
  } catch (error) {
    return res.status(500).send("Error occur while saving message.");
  }
};

//    ----------  READ  ----------     //
//  get all messages of a user
const getMessages = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { createMessage, getMessages };
