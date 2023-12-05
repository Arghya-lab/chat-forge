const Member = require("../models/Member");
const Channel = require("../models/Channel");
const Server = require("../models/Server");


//    ----------  CREATE  ----------     //
//  creating a new channel by admin or moderator
const createChannel = async (req, res)=> {
  try {
    const { userId } = req.user;
    const { serverId } = req.params;
    const { name, type } = req.body;
    const member = await Member.findOne({ userId, serverId });
    if (member.role !== "admin" && member.role !== "moderator") {
      return res.status(401).json({
        error: "You are unauthorize to perform this action.",
      });
    }
    const newChannel = await Channel.create({ name, type, serverId });
    await Server.findByIdAndUpdate(serverId, { $push: { channels: newChannel._id } })
    res.status(201).json({ id: newChannel._id, name: newChannel.name, type: newChannel.type });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occur while creating channel." });
  }
}

//    ----------  READ  ----------     //
//  fetching all channel info by member
const getChannels = async (req, res)=> {
  try {
    const { userId } = req.user;
    const { serverId } = req.params;
    const member = await Member.findOne({userId,serverId})
    const server = await Server.findById(serverId)
    if (! server.members.includes(member._id)) {
      return res.status(400).json({
        error: "You are unauthorize to perform this action.",
      });
    }
    const channels = await Channel.find({serverId})
    const data = channels.map(channel=>({id: channel._id, name: channel.name, type: channel.type}))
    res.status(200).json(data);    
  } catch (error) {
    res.status(500).json({ error: "Error occur while fetching channel." });
  }
}

//    ----------  UPDATE  ----------     //
//    ----------  DELETE  ----------     //


module.exports = { createChannel, getChannels }