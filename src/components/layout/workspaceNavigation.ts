import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { OrgRole } from "../utils/types/role";

export interface NavigationItem {
  label: string;
  icon: LucideIcon;
  getPath: (organizationId: string) => string;

  requiredRole?: OrgRole;
}

export const getWorkspaceNavigation = (
  role: OrgRole | null
): NavigationItem[] => {
  const items: NavigationItem[] = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,

      getPath: (organizationId) => `/organizations/${organizationId}`,
    },

    {
      label: "Projects",
      icon: FolderKanban,

      getPath: (organizationId) => `/organizations/${organizationId}/projects`,
    },
  ];

  if (role === "org_admin") {
    items.push({
      label: "Members",
      icon: Users,

      getPath: (organizationId) => `/organizations/${organizationId}/members`,
    });
  }

  items.push({
    label: "Settings",
    icon: Settings,

    getPath: (organizationId) => `/organizations/${organizationId}/settings`,
  });

  return items;
};
