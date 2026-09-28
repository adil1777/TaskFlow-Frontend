import type z from "zod";
import type { OrgRole, SystemRole } from "./role";
import type { AxiosRequestConfig } from "axios";
import type { LoginSchema, registerSchema } from "../validations/authSchema";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;

  organization?: {
    id: string;
    name: string;
    role: "org_admin" | "member";
  };
}

export interface RefreshResponse {
  session?: {
    accessToken?: string;
    refreshToken?: string;
  };

  accessToken?: string;
  refreshToken?: string;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  globalLoading: boolean;
}

export type Role = OrgRole;

export interface User {
  id: string;
  email: string;
  name: string;
  systemRole: SystemRole;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface CurrentOrganization {
  id: string;
  name: string;
  role: OrgRole | null;
}

export interface OrganizationState {
  organizationId: string | null;
  organizationName: string | null;
  role: OrgRole | null;
}

export interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface AuthOrganization {
  id: string;
  name: string;
  role: OrgRole;
}
