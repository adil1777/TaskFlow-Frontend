import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User, Role } from "../types/auth";

interface AuthContextType {
  user: User | null;
  role: Role | null;
  organizationId: string | null;
  isAuthenticated: boolean;
  login: (
    accessToken: string,
    user: User,
    organizationId: string,
    role: Role,
    refreshToken?: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");

    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState<Role | null>(() => {
    return localStorage.getItem("role") as Role | null;
  });

  const [organizationId, setOrganizationId] = useState<string | null>(() => {
    return localStorage.getItem("organizationId");
  });

  const login = (
    accessToken: string,
    userData: User,
    orgId: string,
    userRole: Role,
    refreshToken?: string
  ) => {
    localStorage.setItem("accessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    localStorage.setItem("organizationId", orgId);

    setUser(userData);
    setRole(userRole);
    setOrganizationId(orgId);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("organizationId");

    setUser(null);
    setRole(null);
    setOrganizationId(null);
  };

  useEffect(() => {
    // Restore authentication state from localStorage.
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        organizationId,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
