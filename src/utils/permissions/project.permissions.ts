import type { Project } from "../types/project";
import type { User } from "../types/auth";
import type { OrgRole } from "../types/role";

export const isProjectManager = (
  project: Project | null | undefined,
  user: User | null | undefined
) => {
  if (!project || !user) {
    return false;
  }

  return project.managerId === user.id;
};

export const canCreateProject = (organizationRole: OrgRole | null) => {
  return organizationRole === "org_admin";
};

export const canUpdateProject = (organizationRole: OrgRole | null) => {
  return organizationRole === "org_admin";
};

export const canDeleteProject = (organizationRole: OrgRole | null) => {
  return organizationRole === "org_admin";
};

export const canManageProjectMembers = (organizationRole: OrgRole | null) => {
  return organizationRole === "org_admin";
};
