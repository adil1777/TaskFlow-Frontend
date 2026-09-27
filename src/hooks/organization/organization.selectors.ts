import type { RootState } from "../../redux/store";

export const selectCurrentOrganizationId = (state: RootState) =>
  state.organization.organizationId;

export const selectCurrentOrganizationName = (state: RootState) =>
  state.organization.organizationName;

export const selectCurrentOrganizationRole = (state: RootState) =>
  state.organization.role;

export const selectCurrentOrganization = (state: RootState) => ({
  id: state.organization.organizationId,
  name: state.organization.organizationName,
  role: state.organization.role,
});
