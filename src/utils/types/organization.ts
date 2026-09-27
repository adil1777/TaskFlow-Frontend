import type { OrgRole } from "./role";

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  organizationId: string;
  organization: Organization;
  role: OrgRole;
}

export interface OrganizationMember {
  userId: string;
  organizationId: string;
  role: OrgRole;

  user: {
    id: string;
    name: string;
    email: string;
  };
}