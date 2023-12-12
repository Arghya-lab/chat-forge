import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "disconnect",
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    onConnect: (state) => {
      state.status = "connected";
    },
    onDisconnect: (state) => {
      state.status = "disconnect";
    },
    onError: (state) => {
      state.status = "error";
    },
  },
});

export const { onConnect, onDisconnect, onError } = socketSlice.actions;

export default socketSlice.reducer;
