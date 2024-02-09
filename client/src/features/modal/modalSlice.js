import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  isModalOpen: false,
  data: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onModalOpen: (state, action) => {
      const { type, data = {} } = action.payload;

      state.type = type;
      state.isModalOpen = true;
      state.data = data;
    },
    onModalClose: (state) => {
      state.type = null;
      state.isModalOpen = false;
      state.data = {};
    },
  },
});

export const { onModalOpen, onModalClose } = modalSlice.actions;

export default modalSlice.reducer;
