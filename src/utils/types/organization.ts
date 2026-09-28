import type { OrgRole } from "./role";

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationListItem extends Organization {
  role: OrgRole | null;
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

export interface CreateOrganizationPayload {
  name: string;
}

export interface UpdateOrganizationPayload {
  name?: string;
}

export interface AddOrganizationMemberPayload {
  userId: string;
  role: OrgRole;
}

export interface UpdateOrganizationMemberPayload {
  role: OrgRole;
}
