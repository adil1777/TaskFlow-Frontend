import type z from "zod";
import type { registerSchema } from "../validations/registerSchema";
import type { OrgRole } from "./role";

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
  user: User;
  accessToken: string;
  refreshToken?: string;
  organizationId: string;
  role: OrgRole;
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
