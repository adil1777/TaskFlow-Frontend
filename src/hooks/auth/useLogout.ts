import { useCallback } from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  useAppDispatch,
} from "../../redux/hooks";

import {
  clearCredentials,
} from "../../redux/slices/authSlice";

import {
  clearCurrentOrganization,
} from "../../redux/slices/organizationSlice";
import { logout } from "../../features/auth/auth.service";


export const useLogout = () => {
  const dispatch =
    useAppDispatch();

  const queryClient =
    useQueryClient();

  return useCallback(
    async () => {
      try {
        await logout();
      } finally {
        dispatch(
          clearCredentials()
        );

        dispatch(
          clearCurrentOrganization()
        );

        queryClient.clear();
      }
    },
    [
      dispatch,
      queryClient,
    ]
  );
};