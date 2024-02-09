import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader, multipartHeader } from "../../utils/axios";
import { selectConversation } from "../selected/selectedSlice";
import { store } from "../../app/store";

// First, create the thunk
const getConversations = createAsyncThunk(
  "directMessages/getConversations",
  async () => {
    const res = await axios.get(`user/conversations`, authHeader);
    return res.data;
  }
);

const addDirectMessages = createAsyncThunk(
  "directMessages/addDirectMessages",
  async () => {
    const res = await axios.get(
      `/directMessage/${
        store.getState().selected.currentConversation.userId
      }?firstMsgIdx=${store.getState().directMessages.directMessages.length}`,
      authHeader
    );
    return {
      messages: res.data?.messages,
      totalMessage: res.data?.totalMessage,
    };
  }
);

const sendDirectMessage = createAsyncThunk(
  "directMessages/sendDirectMessage",
  async ({ formData, receiverId }) => {
    const res = await axios.post(
      `/directMessage/${receiverId}`,
      formData,
      multipartHeader
    );
    return res.data;
  }
);

const editDirectMessage = createAsyncThunk(
  "directMessages/editDirectMessage",
  async (data) => {
    const res = await axios.patch(
      `directMessage/edit/${
        store.getState().selected.editingDirectMessage?.id
      }`,
      { content: data.content },
      authHeader
    );
    return res.data;
  }
);

const deleteDirectMessage = createAsyncThunk(
  "directMessages/deleteMessage",
  async (id) => {
    const res = await axios.patch(`directMessage/delete/${id}`, {}, authHeader);
    console.log(res.data);
    return res.data;
  }
);

const initialState = {
  conversations: [], //  [ { userId, displayName, userName, imgUrl, avatarColor, newReceivedMessages } ]
  directMessages: [], //  [ { id, content, deleted, createdAt, updatedAt, senderName, senderId, senderDp, senderAvatarColor } ]
  totalDirectMessage: 0,
};

export const directMessagesSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {
    onNewDirectChat: (state, action) => {
      // const { message, conversation } = action.payload;
      const { conversation } = action.payload;
      state.conversations.unshift(conversation);
    },
    onDirectMessageReceived: (state, action) => {
      const { message, currentConversation } = action.payload;
      if (currentConversation?.userId === message.senderId) {
        state.directMessages.unshift(message);
        state.totalDirectMessage = state.totalDirectMessage + 1;
      } else {
        // this code block not working fixed it
        state.conversations = state.conversations.map((conversation) => {
          if (conversation?.userId !== message.senderId) {
            return conversation;
          } else {
            return {
              ...conversation,
              newReceivedMessages: conversation.newReceivedMessages + 1,
            };
          }
        });
      }
    },
    onEditDirectMessage: (state, action) => {
      const editedDirectMessage = action.payload;

      state.directMessages = state.directMessages.map((directMessage) => {
        if (directMessage.id === editedDirectMessage.id) {
          return editedDirectMessage;
        } else {
          return directMessage;
        }
      });
    },
    onDeleteDirectMessage: (state, action) => {
      const deletedDirectMessages = action.payload;

      state.directMessages = state.directMessages.map((directMessage) => {
        if (directMessage.id === deletedDirectMessages.id) {
          return deletedDirectMessages;
        } else {
          return directMessage;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  change selected channel of the server
    builder.addCase(selectConversation.fulfilled, (state, action) => {
      //  remove previous joined room
      const { messages, totalMessage } = action.payload;
      state.directMessages = messages;
      state.totalDirectMessage = totalMessage;

      //  after getting all messages join the room
      // socket.emit(socketEventEnum.JOIN_ROOM_EVENT, channel.id);
      //  handle on get message event
    });

    //  add more direct message by user
    builder.addCase(addDirectMessages.fulfilled, (state, action) => {
      state.directMessages = [
        ...state.directMessages,
        ...action.payload.messages,
      ];
      state.totalDirectMessage = action.payload.totalMessage;
    });
    builder.addCase(addDirectMessages.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(sendDirectMessage.fulfilled, (state, action) => {
      state.directMessages.unshift(action.payload);
      state.totalDirectMessage = state.totalDirectMessage + 1;
    });
    builder.addCase(sendDirectMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(editDirectMessage.fulfilled, (state, action) => {
      const editedDirectMessage = action.payload;

      state.directMessages = state.directMessages.map((directMessage) => {
        if (directMessage.id === editedDirectMessage.id) {
          return editedDirectMessage;
        } else {
          return directMessage;
        }
      });
    });
    builder.addCase(editDirectMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(deleteDirectMessage.fulfilled, (state, action) => {
      const deletedDirectMessages = action.payload;

      state.directMessages = state.directMessages.map((directMessage) => {
        if (directMessage.id === deletedDirectMessages.id) {
          return deletedDirectMessages;
        } else {
          return directMessage;
        }
      });
    });
    builder.addCase(deleteDirectMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const {
  onNewDirectChat,
  onDirectMessageReceived,
  onEditDirectMessage,
  onDeleteDirectMessage,
} = directMessagesSlice.actions;
export {
  getConversations,
  addDirectMessages,
  sendDirectMessage,
  editDirectMessage,
  deleteDirectMessage,
};
export default directMessagesSlice.reducer;
