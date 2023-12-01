import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { displayName, token } = action.payload;
      state.displayName = displayName;
      state.token = token;
    },
    removeAuth: (state) => {
      state.displayName = "";
      state.token = "";
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
