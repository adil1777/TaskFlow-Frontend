import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProjectApi,
  deleteProjectApi,
  getProjectApi,
  getProjectsApi,
  updateProjectApi,
  type CreateProjectPayload,
  type UpdateProjectPayload,
} from "../../api/project.api";
import { projectQueryKeys } from "../../utils/query/queryKeys";


export const useProjects = (
  organizationId: string | null
) => {
  return useQuery({
    queryKey: organizationId
      ? projectQueryKeys.list(
          organizationId
        )
      : ["projects", "list", "disabled"],

    queryFn: () =>
      getProjectsApi(
        organizationId!
      ),

    enabled:
      Boolean(organizationId),
  });
};

export const useProject = (
  projectId: string | undefined
) => {
  return useQuery({
    queryKey: projectId
      ? projectQueryKeys.detail(
          projectId
        )
      : ["projects", "detail", "disabled"],

    queryFn: () =>
      getProjectApi(
        projectId!
      ),

    enabled:
      Boolean(projectId),
  });
};

export const useCreateProject =
  (
    organizationId: string
  ) => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        payload: CreateProjectPayload
      ) =>
        createProjectApi(
          payload
        ),

      onSuccess: async () => {
        await queryClient.invalidateQueries(
          {
            queryKey:
              projectQueryKeys.list(
                organizationId
              ),
          }
        );
      },
    });
  };

export const useUpdateProject =
  (
    organizationId: string
  ) => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        projectId,
        payload,
      }: {
        projectId: string;
        payload: UpdateProjectPayload;
      }) =>
        updateProjectApi(
          projectId,
          payload
        ),

      onSuccess: async (
        project
      ) => {
        queryClient.setQueryData(
          projectQueryKeys.detail(
            project.id
          ),
          project
        );

        await queryClient.invalidateQueries(
          {
            queryKey:
              projectQueryKeys.list(
                organizationId
              ),
          }
        );
      },
    });
  };

export const useDeleteProject =
  (
    organizationId: string
  ) => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteProjectApi,

      onSuccess: async (
        _,
        projectId
      ) => {
        queryClient.removeQueries({
          queryKey:
            projectQueryKeys.detail(
              projectId
            ),
        });

        await queryClient.invalidateQueries(
          {
            queryKey:
              projectQueryKeys.list(
                organizationId
              ),
          }
        );
      },
    });
  };