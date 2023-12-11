import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "disconnect",
  messages: [],
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
    onMessageReceived: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { onConnect, onDisconnect, onError, onMessageReceived } = socketSlice.actions;

export default socketSlice.reducer;
