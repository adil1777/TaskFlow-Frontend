import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import organizationReducer from "./slices/organizationSlice";
import uiReducer from "./slices/uiSlice";

import { authStorage } from "../services/authStorage";
import { themeStorage } from "../services/themeStorage";

const user = authStorage.getUser();
const accessToken = authStorage.getAccessToken();
const refreshToken = authStorage.getRefreshToken();
const organization = authStorage.getOrganization();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    ui: uiReducer,
  },

  preloadedState: {
    auth: {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(
        user && accessToken
      ),
    },

    organization: {
      organizationId:
        organization?.id ?? null,

      organizationName:
        organization?.name ?? null,

      role: organization?.role ?? null,
    },

    ui: {
      sidebarOpen: true,
      theme: themeStorage.getTheme(),
    },
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;