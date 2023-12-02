import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import infoSlice from "../features/info/infoSlice";

const reducer = combineReducers({
  auth: authSlice,
  info: infoSlice,
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
