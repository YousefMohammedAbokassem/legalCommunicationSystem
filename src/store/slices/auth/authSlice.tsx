import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("access_token") || null,
  authenticate: localStorage.getItem("authenticate") || false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.authenticate = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("authenticate");
    },
    logIn: (state) => {
      state.authenticate = true;
      localStorage.setItem("authenticate", "true");
    },
  },
});

export const { logoutUser, logIn } = authReducer.actions;
export default authReducer.reducer;
