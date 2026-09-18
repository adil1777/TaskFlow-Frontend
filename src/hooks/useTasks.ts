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
  const { organizationId } = useAuth();

  return useQuery({
    queryKey: [
      ...taskQueryKeys.projectLists(),
      organizationId ?? "",
      projectId,
      page,
      limit,
      filters,
    ],
    queryFn: () => getProjectTasks(projectId, page, limit, filters),
    enabled: Boolean(organizationId) && Boolean(projectId),
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => updateTask(taskId, payload),

    onSuccess: (_, variables) => {
      /*
       * Refresh all project task lists.
       *
       * This ensures the updated task is also reflected
       * wherever the project task list is displayed.
       */
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      /*
       * Refresh the currently opened task details.
       *
       * useTask() uses:
       * ["tasks", "detail", organizationId, taskId]
       */
      if (organizationId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(organizationId, variables.taskId),
        });
      }
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),

    onSuccess: (_, taskId) => {
      /*
       * Refresh project task lists.
       */
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      /*
       * Remove the deleted task from detail cache.
       */
      if (organizationId) {
        queryClient.removeQueries({
          queryKey: taskQueryKeys.detail(organizationId, taskId),
        });
      }
    },
  });
};

export const useAssignTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      assignTask(taskId, userId),

    onSuccess: (_, variables) => {
      /*
       * Refresh project task lists.
       */
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      /*
       * Refresh task details.
       */
      if (organizationId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(organizationId, variables.taskId),
        });
      }
    },
  });
};

export const useUnassignTask = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useAuth();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      unassignTask(taskId, userId),

    onSuccess: (_, variables) => {
      /*
       * Refresh project task lists.
       */
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.projectLists(),
      });

      /*
       * Refresh task details.
       */
      if (organizationId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.detail(organizationId, variables.taskId),
        });
      }
    },
  });
};

export const useTask = (taskId: string) => {
  const { organizationId } = useAuth();

  return useQuery({
    queryKey: taskQueryKeys.detail(organizationId ?? "", taskId),
    queryFn: () => getTaskById(taskId),
    enabled: Boolean(organizationId) && Boolean(taskId),
  });
};
