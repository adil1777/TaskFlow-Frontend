import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  AuthState,
  User,
} from "../../utils/types/auth";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string | null;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;

      state.refreshToken =
        action.payload.refreshToken ?? null;

      state.isAuthenticated = true;
    },

    updateAccessToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken =
        action.payload;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;