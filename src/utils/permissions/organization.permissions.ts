import type { OrgRole } from "../types/role";

import { ORG_ROLES } from "../types/role";

export const isOrganizationAdmin = (role: OrgRole | null) => {
  return role === ORG_ROLES.ORG_ADMIN;
};

export const isOrganizationMember = (role: OrgRole | null) => {
  return role === ORG_ROLES.MEMBER;
};

export const canCreateProject = (role: OrgRole | null) => {
  return isOrganizationAdmin(role);
};

export const canUpdateProject = (role: OrgRole | null) => {
  return isOrganizationAdmin(role);
};

export const canDeleteProject = (role: OrgRole | null) => {
  return isOrganizationAdmin(role);
};

export const canManageMembers = (role: OrgRole | null) => {
  return isOrganizationAdmin(role);
};
