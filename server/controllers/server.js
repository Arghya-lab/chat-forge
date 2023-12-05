const Member = require("../models/Member");
const Server = require("../models/Server");
const ShortUniqueId = require("short-unique-id");

//    ----------  CREATE  ----------     //
//  creating a new server
const createServer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;
    const imgUrl = req.imgUrl;
    const newServer = await Server.create({
      name,
      imgUrl,
    });
    const newMember = await Member.create({
      role: "admin",
      userId,
      serverId: newServer._id,
    });
    await Server.findByIdAndUpdate(newServer._id, {
      $push: { members: newMember._id },
    });
    res.status(201).json({ id: newServer._id, name, imgUrl });
  } catch (error) {
    res.status(500).json({ error: "Error occur while creating server." });
  }
};

//  creating invite link by admin or moderator
const createInviteLink = async (req, res) => {
  try {
    const { userId } = req.user;
    const { serverId } = req.params;
    const member = await Member.findOne({ userId, serverId });
    if (member.role !== "admin" && member.role !== "moderator") {
      return res.status(401).json({
        error: "You are unauthorize to perform this action.",
      });
    }
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const inviteCode = randomUUID();
    await Server.findByIdAndUpdate(serverId, { $set: { inviteCode } });
    res.status(201).json({ inviteCode });
  } catch (error) {
    res.status(500).json({ error: "Error occur while creating invite link." });
  }
};

//    ----------  READ  ----------     //
//  fetch all servers info a user on
const getServers = async (req, res) => {
  try {
    const { userId } = req.user;
    const members = await Member.find({ userId });
    const data = await Promise.all(
      members.map(async (member) => {
        const serverInfo = await Server.findById(member.serverId);
        const { _id, name, imgUrl } = serverInfo;
        return { id: _id, name, imgUrl };
      })
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occur while fetching server." });
  }
};

//  get invite link by the member of server
const getInviteLink = async (req, res) => {
  try {
    const { userId } = req.user;
    const { serverId } = req.params;
    const member = await Member.findOne({ userId, serverId });
    if (!member) {
      return res.status(400).json({
        error: "You are unauthorize to get data.",
      });
    }
    const { inviteCode } = await Server.findById(serverId);
    res.status(201).json({ inviteCode });
  } catch (error) {
    res.status(500).json({ error: "Error occur while fetching server." });
  }
};

//    ----------  UPDATE  ----------     //
//  add member to server through the invite code
const addMember = async (req, res) => {
  try {
    const { userId } = req.user;
    const { inviteCode } = req.params;
    const server = await Server.findOne({ inviteCode });
    if (!server) {
      return res.status(400).json({
        error: "Broken invite link.",
      });
    }

    if (await Member.findOne({ userId, serverId: server._id })) {
      return res
        .status(200)
        .json({ id: server._id, name: server.name, imgUrl: server.imgUrl });
    }
    const newMember = await Member.create({
      userId,
      serverId: server._id,
    });
    await Server.findByIdAndUpdate(server._id, {
      $push: { members: newMember._id },
    });
    res
      .status(200)
      .json({ id: server._id, name: server.name, imgUrl: server.imgUrl });
  } catch (error) {
    res.status(500).json({ error: "Error occur while adding to server." });
  }
};

//    ----------  DELETE  ----------     //
module.exports = {
  createServer,
  getServers,
  createInviteLink,
  getInviteLink,
  addMember,
};
