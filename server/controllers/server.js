const Member = require("../models/Member");
const Server = require("../models/Server");

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

const getServers = async (req, res) => {
  try {
    const { userId } = req.user;
    const members = await Member.find({userId})
    const data = await Promise.all(members.map(async member=>{
      const serverInfo = await Server.findById(member.serverId);
      const { _id, name, imgUrl } = serverInfo
      return { id: _id, name, imgUrl }
    }))
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occur while fetching server." });
  }
};

module.exports = {
  createServer, getServers
};
