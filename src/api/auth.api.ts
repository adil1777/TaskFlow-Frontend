import api from "./axios";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../utils/types/auth";

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", payload);

  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
