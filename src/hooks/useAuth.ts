import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  login as loginAction,
  logout as logoutAction,
} from "../redux/slices/authSlice";
import {
  setOrganization,
  clearOrganization,
} from "../redux/slices/organizationSlice";
import { authStorage } from "../services/authStorage";
import type { User } from "../utils/types/auth";
import type { OrgRole } from "../utils/types/role";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const organization = useAppSelector((state) => state.organization);

  const login = (
    accessToken: string,
    user: User,
    organizationId: string,
    role: OrgRole,
    refreshToken?: string
  ) => {
    // Update Redux auth state
    dispatch(
      loginAction({
        user,
        accessToken,
        refreshToken,
      })
    );

    // Update Redux organization state
    dispatch(
      setOrganization({
        organizationId,
        role,
      })
    );

    // Persist authentication data
    authStorage.setAuth(
      accessToken,
      user,
      organizationId,
      role,
      refreshToken
    );
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch(clearOrganization());

    authStorage.clearAuth();
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