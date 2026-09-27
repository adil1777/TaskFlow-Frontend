import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from "../../api/organization.api";
import { organizationQueryKeys } from "../../utils/query/queryKeys";

export const useOrganizations = () => {
  return useQuery({
    queryKey: organizationQueryKeys.list(),

    queryFn: getOrganizations,

    staleTime: 60_000,
  });
};

export const useOrganization = (organizationId?: string) => {
  return useQuery({
    queryKey: organizationId
      ? organizationQueryKeys.detail(organizationId)
      : [...organizationQueryKeys.all, "disabled"],

    queryFn: () => getOrganizationById(organizationId!),

    enabled: Boolean(organizationId),

    staleTime: 60_000,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.all,
      });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: Parameters<typeof updateOrganization>[1];
    }) => updateOrganization(organizationId, payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.detail(variables.organizationId),
      });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.all,
      });
    },
  });
};
