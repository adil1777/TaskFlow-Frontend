import type z from "zod";
import type { registerSchema } from "../utils/validations/registerSchema";

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

export type Role = "org_admin" | "member";

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
  role: Role;
}
