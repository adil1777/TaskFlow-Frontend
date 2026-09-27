import type {
  CurrentOrganization,
  User,
} from "../utils/types/auth";

import {
  STORAGE_KEYS,
} from "../utils/constants/app.constants";

const parse = <T>(
  value: string | null
): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(
      STORAGE_KEYS.REFRESH_TOKEN
    );
  },

  getUser(): User | null {
    return parse<User>(
      localStorage.getItem(STORAGE_KEYS.USER)
    );
  },

  getOrganization(): CurrentOrganization | null {
    return parse<CurrentOrganization>(
      localStorage.getItem(
        STORAGE_KEYS.ORGANIZATION
      )
    );
  },

  setSession({
    accessToken,
    refreshToken,
    user,
  }: {
    accessToken: string;
    refreshToken?: string | null;
    user: User;
  }) {
    localStorage.setItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      accessToken
    );

    if (refreshToken) {
      localStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        refreshToken
      );
    }

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(user)
    );
  },

  updateAccessToken(
    accessToken: string
  ) {
    localStorage.setItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      accessToken
    );
  },

  setOrganization(
    organization: CurrentOrganization
  ) {
    localStorage.setItem(
      STORAGE_KEYS.ORGANIZATION,
      JSON.stringify(organization)
    );
  },

  clearOrganization() {
    localStorage.removeItem(
      STORAGE_KEYS.ORGANIZATION
    );
  },

  clearSession() {
    localStorage.removeItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    localStorage.removeItem(
      STORAGE_KEYS.REFRESH_TOKEN
    );

    localStorage.removeItem(
      STORAGE_KEYS.USER
    );

    localStorage.removeItem(
      STORAGE_KEYS.ORGANIZATION
    );
  },
};