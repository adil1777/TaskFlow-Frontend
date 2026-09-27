import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { clearCredentials, setCredentials } from "../../redux/slices/authSlice";

import { clearCurrentOrganization } from "../../redux/slices/organizationSlice";

import { authStorage } from "../../services/authStorage";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const login = useCallback(
    ({
      accessToken,
      refreshToken,
      user,
    }: {
      accessToken: string;
      refreshToken?: string | null;
      user: NonNullable<typeof auth.user>;
    }) => {
      dispatch(
        setCredentials({
          accessToken,
          refreshToken,
          user,
        })
      );

      authStorage.setSession({
        accessToken,
        refreshToken,
        user,
      });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(clearCredentials());
    dispatch(clearCurrentOrganization());

    authStorage.clearSession();
  }, [dispatch]);

  return {
    user: auth.user,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    isAuthenticated: auth.isAuthenticated,

    login,
    logout,
  };
};
