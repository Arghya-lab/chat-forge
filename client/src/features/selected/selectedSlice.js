import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader } from "../../utils/axios";
import { socket } from "../../Components/HomePage";
import socketEventEnum from "../../socketEventEnum";
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
  async (channel = store.getState().selected.channels.text[0] || null) => {
    const res = await axios.get(`/message/${channel?.id}`, authHeader);
    return { channel, messages: res.data };
  }
);

const createChannel = createAsyncThunk(
  "selected/createChannel",
  async (data) => {
    const res = await axios.post(
      `/channel/create/${store.getState().selected.server?.id}`,
      data,
      authHeader
    );
    return res.data;
  }
);

const sendMessage = createAsyncThunk("selected/sendMessage", async (data) => {
  const res = await axios.post(
    `/message/${store.getState().selected.selectedChannel?.id}`,
    { content: data.content },
    authHeader
  );
  return res.data;
});

const initialState = {
  server: {
    id: "",
    name: "",
    imgUrl: "",
  }, // { id, name, imgUrl }
  channels: {
    text: [],
    voice: [],
    video: [],
  }, //  [ { id, name, type } ]
  selectedChannel: {
    id: "",
    name: "",
    type: "",
  },
  messages: [],
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    //  Set current server & set all channels of the server
    //  & by default set selected channel as first text channel of the server
    builder.addCase(selectServer.fulfilled, (state, action) => {
      //remove previous room
      state.messages = [];
      const { server, channels } = action.payload;
      state.server = server;

      let sortedChannels = { text: [], voice: [], video: [] };
      channels.forEach((channel) => {
        switch (channel.type) {
          case "text":
            sortedChannels.text.push(channel);
            break;
          case "voice":
            sortedChannels.voice.push(channel);
            break;
          case "video":
            sortedChannels.video.push(channel);
            break;
          default:
            console.error("Unidentified channel type detected.");
            break;
        }
      });
      state.channels = sortedChannels;
    });
    builder.addCase(selectServer.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  change selected channel of the server
    builder.addCase(selectChannel.fulfilled, (state, action) => {
      //  remove previous joined room
      const { channel, messages } = action.payload;
      state.selectedChannel = channel;
      state.messages = messages;
      socket.emit(socketEventEnum.JOIN_ROOM_EVENT, state.selectedChannel?.id);
      //  handle on get message event
    });
    builder.addCase(selectChannel.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  create new channel by admin or moderator
    builder.addCase(createChannel.fulfilled, (state, action) => {
      switch (action.payload?.type) {
        case "text":
          state.channels.text.push(action.payload);
          break;
        case "voice":
          state.channels.voice.push(action.payload);
          break;
        case "video":
          state.channels.video.push(action.payload);
          break;
        default:
          console.error("Unidentified channel type detected.");
          break;
      }
    });
    builder.addCase(createChannel.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  add new send message by user
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.messages.unshift(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const { addMessage } = selectedSlice.actions;
export { selectServer, selectChannel, createChannel, sendMessage };
export default selectedSlice.reducer;
