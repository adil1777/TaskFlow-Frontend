import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  AuthLoginPayload,
  AuthState,
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
    login: (
      state,
      action: PayloadAction<AuthLoginPayload>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;
      state.refreshToken =
        action.payload.refreshToken ?? null;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },

    updateAccessToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;