import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addOrganizationMember,
  getOrganizationMembers,
  removeOrganizationMember,
  updateOrganizationMember,
} from "../../api/organization.api";
import { organizationQueryKeys } from "../../utils/query/queryKeys";

export const useOrganizationMembers = (organizationId?: string) => {
  return useQuery({
    queryKey: organizationId
      ? organizationQueryKeys.members(organizationId)
      : [...organizationQueryKeys.all, "members", "disabled"],

    queryFn: () => getOrganizationMembers(organizationId!),

    enabled: Boolean(organizationId),

    staleTime: 30_000,
  });
};

export const useAddOrganizationMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: Parameters<typeof addOrganizationMember>[1];
    }) => addOrganizationMember(organizationId, payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.members(variables.organizationId),
      });
    },
  });
};

export const useUpdateOrganizationMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      userId,
      payload,
    }: {
      organizationId: string;
      userId: string;
      payload: Parameters<typeof updateOrganizationMember>[2];
    }) => updateOrganizationMember(organizationId, userId, payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.members(variables.organizationId),
      });
    },
  });
};

export const useRemoveOrganizationMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      userId,
    }: {
      organizationId: string;
      userId: string;
    }) => removeOrganizationMember(organizationId, userId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.members(variables.organizationId),
      });
    },
  });
};
