import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrganizationState } from "../../utils/types/auth";
import type { OrgRole } from "../../utils/types/role";

const initialState: OrganizationState = {
  organizationId: null,
  role: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (
      state,
      action: PayloadAction<{
        organizationId: string;
        role: OrgRole;
      }>
    ) => {

      state.organizationId = action.payload.organizationId;
      state.role = action.payload.role;
    },

    clearOrganization: (state) => {
      state.organizationId = null;
      state.role = null;
    },

    updateOrganizationRole: (state, action: PayloadAction<OrgRole>) => {
      state.role = action.payload;
    },
  },
});

export const { setOrganization, clearOrganization, updateOrganizationRole } =
  organizationSlice.actions;

export default organizationSlice.reducer;
