import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader } from "../../utils/axios";
import { store } from "../../app/store";
import { selectServer } from "../selected/selectedSlice";

// First, create the thunk
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

const initialState = {
  channels: {
    text: [],
    voice: [],
    video: [],
  }, //  [ { id, name, type } ]
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  set all channels of the server
    builder.addCase(selectServer.fulfilled, (state, action) => {
      const { channels } = action.payload;

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
  },
});

export { createChannel };
export default channelSlice.reducer;
