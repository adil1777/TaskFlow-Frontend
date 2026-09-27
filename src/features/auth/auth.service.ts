import {
  logoutApi,
} from "../../api/auth.api";

import {
  authStorage,
} from "../../services/authStorage";

export const logout = async () => {
  const refreshToken =
    authStorage.getRefreshToken();

  try {
    if (refreshToken) {
      await logoutApi(
        refreshToken
      );
    }
  } finally {
    authStorage.clearSession();
  }
};