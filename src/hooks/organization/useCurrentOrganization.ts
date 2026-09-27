import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  setCurrentOrganization,
  clearCurrentOrganization,
} from "../../redux/slices/organizationSlice";

import { authStorage } from "../../services/authStorage";

import { selectCurrentOrganization } from "./organization.selectors";

import type { CurrentOrganization } from "../../utils/types/auth";

export const useCurrentOrganization = () => {
  const dispatch = useAppDispatch();

  const organization = useAppSelector(selectCurrentOrganization);

  const selectOrganization = useCallback(
    (organization: CurrentOrganization) => {
      dispatch(setCurrentOrganization(organization));

      authStorage.setOrganization(organization);
    },
    [dispatch]
  );

  const clearOrganization = useCallback(() => {
    dispatch(clearCurrentOrganization());

    authStorage.clearOrganization();
  }, [dispatch]);

  return {
    organization,
    organizationId: organization.id,
    organizationName: organization.name,
    role: organization.role,

    selectOrganization,
    clearOrganization,
  };
};
