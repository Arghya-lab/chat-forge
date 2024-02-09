import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader } from "../../utils/axios";
import { store } from "../../app/store";

// First, create the thunk
const selectServer = createAsyncThunk(
  "selected/selectServer",
  async (server) => {
    const res = await axios.get(`/channel/${server?.id}`, authHeader);
    return { server, channels: res.data };
  }
);

const selectChannel = createAsyncThunk(
  "selected/selectChannel",
  async (channel = store.getState().channel.channels.text[0] || null) => {
    const res = await axios.get(`/message/${channel?.id}`, authHeader);
    return {
      channel,
      messages: res.data?.messages,
      totalMessage: res.data?.totalMessage,
    };
  }
);

const selectConversation = createAsyncThunk(
  "selected/selectConversation",
  async (conversation) => {
    const res = await axios.get(
      `directMessage/${conversation?.userId}`,
      authHeader
    );
    return {
      conversation,
      messages: res.data?.messages,
      totalMessage: res.data?.totalMessage,
    };
  }
);

const initialState = {
  server: {
    id: "",
    name: "",
    imgUrl: "",
    userRole: "",
  }, // { id, name, imgUrl, userRole }
  selectedChannel: {
    id: "",
    name: "",
    type: "",
  },
  editingMessage: null, //  { id, content, deleted, createdAt, updatedAt, senderName, senderId, senderDp, senderAvatarColor }
  editingDirectMessage: null, //  { id, content, senderId, deleted, createdAt, updatedAt, senderName, senderDp, senderAvatarColor }
  currentConversation: {
    userId: "",
    displayName: "",
    userName: "",
    imgUrl: "",
    avatarColor: "",
  }, //  userId, displayName, userName, imgUrl, avatarColor, newReceivedMessages
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },
    removeEditingMessage: (state) => {
      state.editingMessage = null;
    },
    setEditingDirectMessage: (state, action) => {
      state.editingDirectMessage = action.payload;
    },
    removeEditingDirectMessage: (state) => {
      state.editingDirectMessage = null;
    },
    clearSelected: (state) => {
      state.server = {
        id: "",
        name: "",
        imgUrl: "",
        userRole: "",
      };
      state.selectedChannel = {
        id: "",
        name: "",
        type: "",
      };
      state.editingMessage = null;
    },
  },
  extraReducers: (builder) => {
    //  Set current server & by default set selected channel as first text channel of the server
    builder.addCase(selectServer.fulfilled, (state, action) => {
      state.server = action.payload.server;
    });
    builder.addCase(selectServer.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  change selected channel of the server
    builder.addCase(selectChannel.fulfilled, (state, action) => {
      const { channel } = action.payload;
      state.selectedChannel = channel;
    });
    builder.addCase(selectChannel.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  select conversation
    builder.addCase(selectConversation.fulfilled, (state, action) => {
      const { conversation } = action.payload;
      const { userId, displayName, userName, imgUrl, avatarColor } =
        conversation;
      state.currentConversation = {
        userId,
        displayName,
        userName,
        imgUrl,
        avatarColor,
      };
    });
    builder.addCase(selectConversation.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const {
  setEditingMessage,
  removeEditingMessage,
  setEditingDirectMessage,
  removeEditingDirectMessage,
  clearSelected,
} = selectedSlice.actions;
export { selectServer, selectChannel, selectConversation };
export default selectedSlice.reducer;
