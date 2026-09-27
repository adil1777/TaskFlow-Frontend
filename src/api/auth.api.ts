import {api} from "./axios";

import type {
  LoginPayload,
  LoginResponse,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
} from "../utils/types/auth";

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

export const registerApi = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", payload);

  return response.data;
};

export const refreshAccessTokenApi = async (
  refreshToken: string
) => {
  const response =
    await api.post<RefreshResponse>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );

  return response.data;
};

export const logoutApi = async (
  refreshToken: string
) => {
  const response = await api.post("/auth/logout", {
    refreshToken,
  });

  return response.data;
};