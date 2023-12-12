import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader, multipartHeader } from "../../utils/axios";

// First, create the thunk
const getUserServers = createAsyncThunk("servers/getUserServers", async () => {
  const res = await axios.get("/server", authHeader);
  return res.data;
});

const addServer = createAsyncThunk("servers/addServer", async (inviteCode) => {
  const res = await axios.patch(`server/${inviteCode}`, {}, authHeader);
  return res.data;
});

const createServer = createAsyncThunk(
  "servers/createServer",
  async (formData) => {
    const res = await axios.post("/server/create", formData, multipartHeader);
    return res.data;
  }
);

const initialState = {
  servers: [], // [ { id, name, imgUrl } ]
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserServers.fulfilled, (state, action) => {
      state.servers = action.payload;
    });
    builder.addCase(getUserServers.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(addServer.fulfilled, (state, action) => {
      if (!state.servers.includes(action.payload))
        state.servers.push(action.payload);
    });
    builder.addCase(addServer.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(createServer.fulfilled, (state, action) => {
      state.servers.push(action.payload);
    });
    builder.addCase(createServer.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export { getUserServers, createServer, addServer };
export default serversSlice.reducer;
