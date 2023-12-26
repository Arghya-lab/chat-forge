require("dotenv").config();
const { AccessToken } = require("livekit-server-sdk");
const Channel = require("../models/Channel");
const User = require("../models/User");

const createToken = async (req, res) => {
  try {
    const { userId } = req.user;
    const { channelId } = req.params;

    const user = await User.findById(userId);
    //  if user not exist
    if (!user) return res.status(404).send("User doesn't exist.");

    //  if channel or Media Room doesn't not exist
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).send("Media room doesn't exist.");

    if (!["audio", "video"].includes(channel.type))
      return res.status(404).send("Media room doesn't exist.");
    console.log(user.displayName)

    const at = new AccessToken(
      "APIZTyDeL3fnX7A",
      // process.env.LK_API_KEY,
      // process.env.LK_API_SECRET,
      "QXzvysdnKPhmE57eKFtaSIAdz1tWoQXUHQfvPoi7kLz",
      { identity: user.displayName }
    );
    at.addGrant({
      roomJoin: true,
      room: channel._id,
      canPublish: true, // Permission to publish audio/video
      canSubscribe: true, // Permission to subscribe to audio/video of others
    });

    const token = at.toJwt();
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error occur while fetching connection token.");
  }
};

module.exports = { createToken };
