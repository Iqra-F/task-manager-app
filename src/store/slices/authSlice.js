// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null, // unified field name across the app
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Only set fields if present in payload to avoid accidental overwrites
    setCredentials: (state, action) => {
      const payload = action.payload || {};
      if (payload.user !== undefined) state.user = payload.user;
      if (payload.token !== undefined) state.token = payload.token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
