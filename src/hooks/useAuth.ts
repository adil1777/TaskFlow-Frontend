import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  login as loginAction,
  logout as logoutAction,
} from "../redux/slices/authSlice";

import {
  setOrganization,
  clearOrganization,
} from "../redux/slices/organizationSlice";

import type { User } from "../utils/types/auth";
import type { OrgRole } from "../utils/types/role";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const organization = useAppSelector(
    (state) => state.organization
  );

  const login = (
    accessToken: string,
    user: User,
    organizationId: string,
    role: OrgRole,
    refreshToken?: string
  ) => {
    dispatch(
      loginAction({
        accessToken,
        user,
        refreshToken,
      })
    );

    dispatch(
      setOrganization({
        organizationId,
        role,
      })
    );
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch(clearOrganization());
  };

  return {
    user: auth.user,

    accessToken: auth.accessToken,

    refreshToken: auth.refreshToken,

    isAuthenticated: auth.isAuthenticated,

    organizationId: organization.organizationId,

    role: organization.role,

    login,

    logout,
  };
};