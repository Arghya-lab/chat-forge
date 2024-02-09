const Conversation = require("../models/Conversation");
const User = require("../models/User");

const getUsersConversations = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!(await User.findById(userId))) {
      return res.status(404).send("User doesn't exist");
    }

    // TODO: implement mongoose aggregation pipeline here
    const conversations = await Conversation.find({
      $or: [{ userOneId: userId }, { userTwoId: userId }],
    }).sort({ updatedAt: -1 });

    const formattedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const conversationUserId =
          conversation.userOneId.toString() !== userId
            ? conversation.userOneId.toString()
            : conversation.userTwoId.toString();
        const conversationUser = await User.findById(conversationUserId).select(
          "displayName userName imgUrl avatarColor"
        );
        return {
          userId: conversationUser._id,
          displayName: conversationUser.displayName,
          userName: conversationUser.userName,
          imgUrl: conversationUser.imgUrl,
          avatarColor: conversationUser.avatarColor,
          newReceivedMessages: 0,
        };
      })
    );
    // Reorder the formatted array based on the original 'conversations' array
    const data = conversations.map((conversation) => {
      const conversationUserId =
        conversation.userOneId.toString() !== userId
          ? conversation.userOneId.toString()
          : conversation.userTwoId.toString();

      const matchingUserData = formattedConversations.find(
        (formattedConversation) =>
          formattedConversation.userId.toString() === conversationUserId
      );
      return matchingUserData;
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occur while fetching conversations." });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { userId } = req.user;
    const { query } = req.params;
    if (!(await User.findById(userId)))
      return res.status(404).send("Please authenticate using a valid token");

    const users = await User.find({
      userName: { $regex: new RegExp(query) },
    }).select("displayName userName imgUrl avatarColor");

    // Convert _id to id and don't send own data
    const data = users.map((user) => {
      if (userId === user._id.toString()) return;
      return {
        id: user._id,
        displayName: user.displayName,
        userName: user.userName,
        imgUrl: user.imgUrl,
        avatarColor: user.avatarColor,
      };
    });

    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ error: "Error occur while searching users." });
  }
};

module.exports = { getUsersConversations, searchUsers };
