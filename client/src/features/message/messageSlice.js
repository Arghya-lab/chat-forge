import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { authHeader, multipartHeader } from "../../utils/axios";
import { store } from "../../app/store";
import { selectChannel, selectServer } from "../selected/selectedSlice";
import socketEventEnum from "../../socketEventEnum";
import { socket } from "../../Components/HomePage";

// First, create the thunk
const sendMessage = createAsyncThunk("selected/sendMessage", async (data) => {
  const res = await axios.post(
    `/message/${store.getState().selected.selectedChannel?.id}`,
    data,
    multipartHeader
  );
  return res.data;
});

const addMessages = createAsyncThunk("selected/addMessages", async () => {
  const res = await axios.get(
    `/message/${store.getState().selected.selectedChannel.id}?firstMsgIdx=${
      store.getState().message.messages.length
    }`,
    authHeader
  );
  return {
    messages: res.data?.messages,
    totalMessage: res.data?.totalMessage,
  };
});

const deleteMessage = createAsyncThunk("selected/deleteMessage", async (id) => {
  const res = await axios.patch(`message/delete/${id}`, {}, authHeader);
  return res.data;
});

const editMessage = createAsyncThunk("selected/editMessage", async (data) => {
  const res = await axios.patch(
    `message/edit/${store.getState().selected.editingMessage?.id}`,
    { content: data.content },
    authHeader
  );
  return res.data;
});

const initialState = {
  messages: [], //  [ { id, content, deleted, createdAt, updatedAt, senderName, senderId, senderDp, senderAvatarColor } ]
  totalMessage: 0,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    onAddMessage: (state, action) => {
      state.messages.unshift(action.payload);
      state.totalMessage += 1;
    },
    onEditMessage: (state, action) => {
      const editedMessage = action.payload;
      console.log(editMessage);

      state.messages = state.messages.map((message) => {
        if (message.id === editedMessage.id) {
          return editedMessage;
        } else {
          return message;
        }
      });
    },
    onDeleteMessage: (state, action) => {
      const deletedMessage = action.payload;

      state.messages = state.messages.map((message) => {
        if (message.id === deletedMessage.id) {
          return deletedMessage;
        } else {
          return message;
        }
      });
    },
  },
  extraReducers: (builder) => {
    //   on server select reset message slice
    builder.addCase(selectServer.fulfilled, (state) => {
      state.messages = [];
      state.totalMessage = 0;
    });

    //  change selected channel of the server
    builder.addCase(selectChannel.fulfilled, (state, action) => {
      //  remove previous joined room
      const { messages, totalMessage, channel } = action.payload;
      state.messages = messages;
      state.totalMessage = totalMessage;

      //  after getting all messages join the room
      socket.emit(socketEventEnum.JOIN_ROOM_EVENT, channel.id);
      //  handle on get message event
    });

    //  add new send message by user
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  add more message by user
    builder.addCase(addMessages.fulfilled, (state, action) => {
      state.messages = [...state.messages, ...action.payload.messages];
      state.totalMessage = action.payload.totalMessage;
    });
    builder.addCase(addMessages.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  delete message by user or admin or moderator
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      const deletedMessage = action.payload;
      console.log(deletedMessage);
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });

    //  edit message by user or admin or moderator
    builder.addCase(editMessage.fulfilled, (state, action) => {
      const editedMessage = action.payload;
      console.log(editedMessage);
    });
    builder.addCase(editMessage.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const { onAddMessage, onEditMessage, onDeleteMessage } =
  messageSlice.actions;
export { sendMessage, addMessages, deleteMessage, editMessage };
export default messageSlice.reducer;
