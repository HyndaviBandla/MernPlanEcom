// This is simply to set the user credentials to local storage and remove them.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Because once we you know, we hit our back end through the user API slice, we get our user info, we're
      // going to send it here as the payload in the action
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
