import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../api/project.api";

import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../utils/types/project";

import { useAppSelector } from "../redux/hooks";

import { projectQueryKeys } from "../utils/query/queryKeys";

export const useProjects = (page = 1, limit = 10) => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  return useQuery({
    queryKey: organizationId
      ? projectQueryKeys.list(organizationId, page, limit)
      : ["projects", "disabled"],

    queryFn: () => getProjects(page, limit),

    enabled: Boolean(organizationId),

    staleTime: 30_000,
  });
};

export const useProject = (projectId?: string) => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  return useQuery({
    queryKey:
      organizationId && projectId
        ? projectQueryKeys.detail(organizationId, projectId)
        : ["projects", "detail", "disabled"],

    queryFn: () => getProjectById(projectId!),

    enabled: Boolean(organizationId) && Boolean(projectId),

    staleTime: 30_000,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: UpdateProjectPayload;
    }) => updateProject(projectId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.details(),
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),

    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: projectQueryKeys.details(),
      });
    },
  });
};
