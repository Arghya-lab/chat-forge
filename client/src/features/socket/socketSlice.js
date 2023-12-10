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
      console.log("connected");
      state.status = "connected";
    },
    onDisconnect: (state) => {
      state.status = "disconnect";
    },
    onError: (state) => {
      state.status = "error";
    },
    onMessageReceived: (state, action) => {
      console.log(action.payload);
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { onConnect, onDisconnect, onError, onMessageReceived } = socketSlice.actions;

export default socketSlice.reducer;
