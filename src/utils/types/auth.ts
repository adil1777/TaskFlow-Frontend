import type z from "zod";
import type { registerSchema } from "../validations/registerSchema";
import type { OrgRole } from "./role";
import type { AxiosRequestConfig } from "axios";

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthLoginPayload {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export type Role = OrgRole;

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    organization: {
      id: string;
      role: OrgRole;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface OrganizationState {
  organizationId: string | null;
  role: OrgRole | null;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  globalLoading: boolean;
}

export interface RetryableRequestConfig
  extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface RefreshResponse {
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };

  accessToken?: string;
  refreshToken?: string;
}