import { createSlice } from "@reduxjs/toolkit";
import socketEventEnum from "../../socketEventEnum";
import { socket } from "../../Components/HomePage";

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
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action) => {
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
      state.selectedChannel = sortedChannels.text[0];
      socket.emit(socketEventEnum.JOIN_ROOM_EVENT, state.selectedChannel?.id)
    },
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
      socket.emit(socketEventEnum.JOIN_ROOM_EVENT, state.selectedChannel?.id)
    },
  },
});

export const { setSelected, setSelectedChannel } = selectedSlice.actions;

export default selectedSlice.reducer;
