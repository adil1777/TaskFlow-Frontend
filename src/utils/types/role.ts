export const ORG_ROLES = {
  ORG_ADMIN: "org_admin",
  MEMBER: "member",
} as const;

export type OrgRole = (typeof ORG_ROLES)[keyof typeof ORG_ROLES];