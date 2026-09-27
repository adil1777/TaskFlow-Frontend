export const SYSTEM_ROLES = {
  SYSTEM_ADMIN: "system_admin",
  USER: "user",
} as const;

export type SystemRole =
  (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

export const ORG_ROLES = {
  ORG_ADMIN: "org_admin",
  MEMBER: "member",
} as const;

export type OrgRole =
  (typeof ORG_ROLES)[keyof typeof ORG_ROLES];