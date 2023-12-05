import { createSlice } from "@reduxjs/toolkit";

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
  }, //  [ { id, name } ]
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      const { server, channels } = action.payload;
      state.server = server;
      let sortedChannels = { text: [], voice: [], video: [], };
      channels.forEach((channel) => {
        switch (channel.type) {
          case "text":
            delete channel.type;
            sortedChannels.text.push(channel);
            break;
          case "voice":
            delete channel.type;
            sortedChannels.voice.push(channel);
            break;
          case "video":
            delete channel.type;
            sortedChannels.video.push(channel);
            break;
          default:
            console.error("Unidentified channel type detected.");
            break;
        }
      });
      state.channels = sortedChannels;
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
