import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  assignTask,
  createTask,
  deleteTask,
  getProjectTasks,
  getTaskById,
  unassignTask,
  updateTask,
} from "../api/task.api";

import type {
  CreateTaskPayload,
  TaskFilters,
  UpdateTaskPayload,
} from "../utils/types/task";

import { taskQueryKeys } from "../utils/query/queryKeys";
import { useAuth } from "./useAuth";

export const useProjectTasks = (
  projectId: string,
  page = 1,
  limit = 10,
  filters?: TaskFilters
) => {
  return useQuery({
    queryKey: ["project-tasks", projectId, page, limit, filters],
    queryFn: () => getProjectTasks(projectId, page, limit, filters),
    enabled: Boolean(projectId),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: CreateTaskPayload;
    }) => createTask(projectId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks", variables.projectId],
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => updateTask(taskId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks"],
      });
    },
  });
};

export const useAssignTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: ({
      taskId,
      userId,
    }: {
      taskId: string;
      userId: string;
    }) => assignTask(taskId, userId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      if (organizationId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(
            organizationId,
            variables.taskId
          ),
        });
      }
    },
  });
};

export const useUnassignTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: ({
      taskId,
      userId,
    }: {
      taskId: string;
      userId: string;
    }) => unassignTask(taskId, userId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      if (organizationId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(
            organizationId,
            variables.taskId
          ),
        });
      }
    },
  });
};

export const useTask = (taskId: string) => {
  const { organizationId } = useAuth();

  return useQuery({
    queryKey: taskQueryKeys.detail(
      organizationId ?? "",
      taskId
    ),
    queryFn: () => getTaskById(taskId),
    enabled: Boolean(organizationId) && Boolean(taskId),
  });
};