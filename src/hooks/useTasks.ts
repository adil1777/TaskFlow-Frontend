import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";

import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../utils/types/task";

import { useAppSelector } from "../redux/hooks";

import { taskQueryKeys } from "../utils/query/queryKeys";

export const useProjectTasks = (
  projectId: string,
  page = 1,
  limit = 10
) => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  return useQuery({
    queryKey:
      organizationId && projectId
        ? taskQueryKeys.projectList(
            organizationId,
            projectId,
            page,
            limit
          )
        : ["tasks", "disabled"],

    queryFn: () =>
      getProjectTasks(projectId, page, limit),

    enabled:
      Boolean(organizationId) &&
      Boolean(projectId),

    staleTime: 30_000,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  return useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: CreateTaskPayload;
    }) => createTask(projectId, payload),

    onSuccess: (_, variables) => {
      if (!organizationId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectList(
          organizationId,
          variables.projectId,
          1,
          10
        ),
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const organizationId = useAppSelector(
    (state) => state.organization.organizationId
  );

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => updateTask(taskId, payload),

    onSuccess: (updatedTask) => {
      if (!organizationId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      if (updatedTask?.id) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(
            organizationId,
            updatedTask.id
          ),
        });
      }
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });
    },
  });
};