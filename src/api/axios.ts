import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  API_CONFIG,
} from "../utils/constants/app.constants";

import {
  authStorage,
} from "../services/authStorage";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,

  timeout: API_CONFIG.TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,

  timeout: API_CONFIG.TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let refreshSubscribers: Array<
  (token: string) => void
> = [];

const subscribeToRefresh = (
  callback: (token: string) => void
) => {
  refreshSubscribers.push(callback);
};

const notifyRefreshSubscribers = (
  token: string
) => {
  refreshSubscribers.forEach(
    (callback) => callback(token)
  );

  refreshSubscribers = [];
};

const clearRefreshSubscribers = () => {
  refreshSubscribers = [];
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
  (error) =>
    Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | InternalAxiosRequestConfig & {
            _retry?: boolean;
          };

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes(
        "/auth/refresh"
      )
    ) {
      return Promise.reject(error);
    }

    const refreshToken =
      authStorage.getRefreshToken();

    if (!refreshToken) {
      authStorage.clearSession();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise(
        (resolve, reject) => {
          subscribeToRefresh(
            (newAccessToken) => {
              if (
                !originalRequest.headers
              ) {
                originalRequest.headers = {};
              }

              originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

              resolve(
                api(originalRequest)
              );
            }
          );

          setTimeout(() => {
            reject(error);
          }, 15_000);
        }
      );
    }

    isRefreshing = true;

    try {
      const response =
        await refreshClient.post<{
          accessToken: string;
        }>(
          "/auth/refresh",
          {
            refreshToken,
          }
        );

      const newAccessToken =
        response.data.accessToken;

      authStorage.updateAccessToken(
        newAccessToken
      );

      notifyRefreshSubscribers(
        newAccessToken
      );

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearRefreshSubscribers();

      authStorage.clearSession();

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);

export { api };