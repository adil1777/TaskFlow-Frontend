import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  CurrentOrganization,
  OrganizationState,
} from "../../utils/types/auth";

const initialState: OrganizationState = {
  organizationId: null,
  organizationName: null,
  role: null,
};

const organizationSlice = createSlice({
  name: "organization",

  initialState,

  reducers: {
    setCurrentOrganization: (
      state,
      action: PayloadAction<CurrentOrganization>
    ) => {
      state.organizationId = action.payload.id;
      state.organizationName = action.payload.name;
      state.role = action.payload.role;
    },

    clearCurrentOrganization: (state) => {
      state.organizationId = null;
      state.organizationName = null;
      state.role = null;
    },
  },
});

export const {
  setCurrentOrganization,
  clearCurrentOrganization,
} = organizationSlice.actions;

export default organizationSlice.reducer;