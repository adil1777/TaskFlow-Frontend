import type { User } from "../utils/types/auth";
import type { OrgRole } from "../utils/types/role";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const ORGANIZATION_ID_KEY = "organizationId";
const ROLE_KEY = "role";

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  getUser(): User | null {
    const storedUser = localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getOrganizationId(): string | null {
    return localStorage.getItem(ORGANIZATION_ID_KEY);
  },

  setOrganizationId(organizationId: string): void {
    localStorage.setItem(
      ORGANIZATION_ID_KEY,
      organizationId
    );
  },

  getRole(): OrgRole | null {
    const role = localStorage.getItem(ROLE_KEY);

    if (
      role !== "org_admin" &&
      role !== "member"
    ) {
      return null;
    }

    return role;
  },

  setRole(role: OrgRole): void {
    localStorage.setItem(ROLE_KEY, role);
  },

  setAuth(
    accessToken: string,
    user: User,
    organizationId: string,
    role: OrgRole,
    refreshToken?: string
  ): void {
    this.setAccessToken(accessToken);
    this.setUser(user);
    this.setOrganizationId(organizationId);
    this.setRole(role);

    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  },

  clearAuth(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ORGANIZATION_ID_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  hasAccessToken(): boolean {
    return Boolean(this.getAccessToken());
  },

  hasRefreshToken(): boolean {
    return Boolean(this.getRefreshToken());
  },
};