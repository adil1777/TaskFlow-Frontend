import api from "./axios";

import type {
  Task,
  TasksResponse,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "../utils/types/task";

export const getProjectTasks = async (
  projectId: string,
  page = 1,
  limit = 10,
  filters?: TaskFilters
): Promise<TasksResponse> => {
  const response = await api.get(
    `/projects/${projectId}/tasks`,
    {
      params: {
        page,
        limit,
        ...filters,
      },
    }
  );

  return response.data;
};

export const getTaskById = async (
  taskId: string
): Promise<Task> => {
  const response = await api.get(`/tasks/${taskId}`);

  return response.data.data;
};

export const createTask = async (
  projectId: string,
  payload: CreateTaskPayload
): Promise<Task> => {
  const response = await api.post(
    `/projects/${projectId}/tasks`,
    payload
  );

  return response.data;
};

export const updateTask = async (
  taskId: string,
  payload: UpdateTaskPayload
): Promise<Task> => {
  const response = await api.patch(
    `/tasks/${taskId}`,
    payload
  );

  return response.data;
};

export const deleteTask = async (
  taskId: string
) => {
  const response = await api.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};

export const assignTask = async (
  taskId: string,
  userId: string
) => {
  const response = await api.post(
    `/tasks/${taskId}/assign`,
    {
      userId,
    }
  );

  return response.data;
};

export const unassignTask = async (
  taskId: string,
  userId: string
) => {
  const response = await api.delete(
    `/tasks/${taskId}/assign/${userId}`
  );

  return response.data;
};