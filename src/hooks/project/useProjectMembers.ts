import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addProjectMemberApi,
  getProjectMembersApi,
  removeProjectMemberApi,
  type AddProjectMemberPayload,
} from "../../api/project.api";
import { projectQueryKeys } from "../../utils/query/queryKeys";

export const useProjectMembers = (projectId: string | undefined) => {
  return useQuery({
    queryKey: projectId
      ? projectQueryKeys.members(projectId)
      : ["projects", "members", "disabled"],

    queryFn: () => getProjectMembersApi(projectId!),

    enabled: Boolean(projectId),
  });
};

export const useAddProjectMember = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddProjectMemberPayload) =>
      addProjectMemberApi(projectId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.members(projectId),
      });
    },
  });
};

export const useRemoveProjectMember = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeProjectMemberApi(projectId, userId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.members(projectId),
      });
    },
  });
};
