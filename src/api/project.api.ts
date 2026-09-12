import api from "./axios";
import type {
  Project,
  ProjectsResponse,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../utils/types/project";

export const getProjects = async (
  page = 1,
  limit = 10
): Promise<ProjectsResponse> => {
  const response = await api.get("/projects", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

export const getProjectById = async (
  projectId: string
): Promise<Project> => {
  const response = await api.get(`/projects/${projectId}`);

  return response.data;
};

export const createProject = async (
  payload: CreateProjectPayload
): Promise<Project> => {
  const response = await api.post("/projects", payload);

  return response.data;
};

export const updateProject = async (
  projectId: string,
  payload: UpdateProjectPayload
): Promise<Project> => {
  const response = await api.patch(
    `/projects/${projectId}`,
    payload
  );

  return response.data;
};

export const deleteProject = async (
  projectId: string
) => {
  const response = await api.delete(
    `/projects/${projectId}`
  );

  return response.data;
};