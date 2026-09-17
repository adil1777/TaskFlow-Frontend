export type OrgRole = "org_admin" | "member";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: OrgRole;
}