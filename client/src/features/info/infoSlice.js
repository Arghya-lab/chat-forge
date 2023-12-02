import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMode: 0,  // 0 -> auto, 1 -> light, 2-> dark
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setSelectedMode: (state, action) => {
      state.selectedMode = action.payload;
    },
  },
});

export const { setSelectedMode } = infoSlice.actions;

export default infoSlice.reducer;
