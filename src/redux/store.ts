import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import organizationReducer from "./slices/organizationSlice";
import uiReducer from "./slices/uiSlice";

import { authStorage } from "../services/authStorage";

import type { AuthState, OrganizationState } from "../utils/types/auth";

const accessToken = authStorage.getAccessToken();
const refreshToken = authStorage.getRefreshToken();
const user = authStorage.getUser();
const organizationId = authStorage.getOrganizationId();
const role = authStorage.getRole();

const isAuthenticated = Boolean(accessToken && user && organizationId && role);

const preloadedAuthState: AuthState = {
  user: user ?? null,
  accessToken: accessToken ?? null,
  refreshToken: refreshToken ?? null,
  isAuthenticated,
};

const preloadedOrganizationState: OrganizationState = {
  organizationId: organizationId ?? null,
  role: role ?? null,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    ui: uiReducer,
  },

  preloadedState: {
    auth: preloadedAuthState,
    organization: preloadedOrganizationState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
