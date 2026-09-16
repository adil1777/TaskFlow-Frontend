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
  TaskFilters,
} from "../utils/types/task";

export const useProjectTasks = (
  projectId: string,
  page = 1,
  limit = 10,
  filters?: TaskFilters
) => {
  return useQuery({
    queryKey: [
      "project-tasks",
      projectId,
      page,
      limit,
      filters,
    ],

    queryFn: () =>
      getProjectTasks(
        projectId,
        page,
        limit,
        filters
      ),

    enabled: Boolean(projectId),

    placeholderData: (previousData) =>
      previousData,
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
    }) =>
      createTask(projectId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "project-tasks",
          variables.projectId,
        ],
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
    }) =>
      updateTask(taskId, payload),

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
    mutationFn: (taskId: string) =>
      deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks"],
      });
    },
  });
};