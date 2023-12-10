import { combineReducers, configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "../middlewares/socketMiddleWare";
import authSlice from "../features/auth/authSlice";
import infoSlice from "../features/info/infoSlice";
import serversSlice from "../features/servers/serversSlice";
import selectedSlice from "../features/selected/selectedSlice";
import socketSlice from "../features/socket/socketSlice";

const reducer = combineReducers({
  auth: authSlice,
  info: infoSlice,
  servers: serversSlice,
  selected: selectedSlice,
  socket: socketSlice,
});

const loadStateFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem("chatForge");
    if (persistedState === null) {
      return undefined;
    }
    return JSON.parse(persistedState);
  } catch (error) {
    console.error("Error while loading auth info.");
    return undefined;
  }
};

export const store = configureStore({
  reducer,
  preloadedState: { ...loadStateFromLocalStorage() },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

// Subscribe to Redux store changes and save the state to local storage
store.subscribe(() => {
  const state = { auth: store.getState().auth, info: store.getState().info };
  try {
    localStorage.setItem("chatForge", JSON.stringify(state));
  } catch (error) {
    console.error("Error while saving data.");
  }
});
