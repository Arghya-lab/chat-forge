import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

const reducer = combineReducers({
  auth: authSlice,
});

const loadStateFromLocalStorage = () => {
  try {
    const authState = localStorage.getItem("chatForge");
    if (authState === null) {
      return undefined;
    }
    return JSON.parse(authState);
  } catch (error) {
    console.error("Error while loading auth info.");
    return undefined;
  }
};

export const store = configureStore({
  reducer,
  preloadedState: { auth: loadStateFromLocalStorage() },
});

// Subscribe to Redux store changes and save the state to local storage
store.subscribe(() => {
  const state = store.getState().auth;
  try {
    localStorage.setItem("chatForge", JSON.stringify(state));
  } catch (error) {
    console.error("Error while saving auth info.");
  }
});
