import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servers: [],  // [ { id, name, imgUrl } ]
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServers: (state, action) => {
      state.servers = action.payload;
    },
    addServer: (state, action) => {
      state.servers.push(action.payload)
    },
  },
});

export const { setServers, addServer } = serversSlice.actions;

export default serversSlice.reducer;
