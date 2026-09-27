import type { OrgRole } from "../types/role";
import { ORG_ROLES } from "../types/role";

export const canManageOrganization = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const canCreateProject = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const canUpdateProject = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const canDeleteProject = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const canManageProjectMembers = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const isOrgAdmin = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const isOrgMember = (
  role: OrgRole | null
) => {
  return role === ORG_ROLES.MEMBER;
};

export const isProjectManager = (
  managerId: string | null,
  userId: string | null
) => {
  return Boolean(
    managerId &&
    userId &&
    managerId === userId
  );
};