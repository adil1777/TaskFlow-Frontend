import axios, {
  type AxiosError
} from "axios";

import { authStorage } from "../services/authStorage";
import { store } from "../redux/store";
import { updateAccessToken } from "../redux/slices/authSlice";
import { logout as logoutAction } from "../redux/slices/authSlice";
import { clearOrganization } from "../redux/slices/organizationSlice";
import type { RefreshResponse, RetryableRequestConfig } from "../utils/types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


let refreshPromise: Promise<string> | null = null;

const clearAuthentication = (): void => {
  authStorage.clearAuth();

  store.dispatch(logoutAction());
  store.dispatch(clearOrganization());

  if (
    window.location.pathname !== "/login"
  ) {
    window.location.replace("/login");
  }
};

const refreshAccessToken =
  async (): Promise<string> => {
    const storedRefreshToken =
      authStorage.getRefreshToken();

    if (!storedRefreshToken) {
      throw new Error(
        "Refresh token is not available"
      );
    }

    const response =
      await refreshClient.post<RefreshResponse>(
        "/auth/refresh",
        {
          refreshToken:
            storedRefreshToken,
        }
      );

    const newAccessToken =
      response.data.data?.accessToken ??
      response.data.accessToken;

    const newRefreshToken =
      response.data.data?.refreshToken ??
      response.data.refreshToken;

    if (!newAccessToken) {
      throw new Error(
        "Refresh response did not contain an access token"
      );
    }

    authStorage.setAccessToken(
      newAccessToken
    );

    store.dispatch(
      updateAccessToken(newAccessToken)
    );

    if (newRefreshToken) {
      authStorage.setRefreshToken(
        newRefreshToken
      );
    }

    return newAccessToken;
  };

api.interceptors.request.use(
  (config) => {
    const accessToken =
      authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | RetryableRequestConfig
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes(
        "/auth/refresh"
      )
    ) {
      clearAuthentication();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise =
          refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken =
        await refreshPromise;

      originalRequest.headers =
        originalRequest.headers ?? {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAuthentication();

      return Promise.reject(
        refreshError
      );
    }
  }
);

export default api;