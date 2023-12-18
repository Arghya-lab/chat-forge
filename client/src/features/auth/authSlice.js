import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// First, create the thunk
const setLogin = createAsyncThunk("users/setLogin", async (data) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
});

const setSignup = createAsyncThunk("users/setSignup", async (data) => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
});

const initialState = {
  id: "",
  displayName: "",
  userName: "",
  imgUrl: "",
  avatarColor: "#12FE21",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(setLogin.fulfilled, (state, action) => {
      const { id, displayName, userName, imgUrl, avatarColor, token } =
        action.payload;
      Object.assign(state, {
        id,
        displayName,
        userName,
        imgUrl,
        avatarColor,
        token,
      });
    });
    builder.addCase(setLogin.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(setSignup.fulfilled, (state, action) => {
      const { id, displayName, userName, imgUrl, avatarColor, token } =
        action.payload;
      Object.assign(state, {
        id,
        displayName,
        userName,
        imgUrl,
        avatarColor,
        token,
      });
    });
    builder.addCase(setSignup.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const { setLogout } = authSlice.actions;
export { setLogin, setSignup };
export default authSlice.reducer;
