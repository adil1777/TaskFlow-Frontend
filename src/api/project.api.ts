import { api } from "./axios";
import type { Project } from "../utils/types/project";


export interface CreateProjectPayload {
  name: string;
  description?: string;
  managerId?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  managerId?: string | null;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AddProjectMemberPayload {
  userId: string;
}

export const getProjectsApi = async (
  organizationId: string
) => {
  const response = await api.get<Project[]>(
    "/projects",
    {
      params: {
        organizationId,
      },
    }
  );

  return response.data;
};

export const getProjectApi = async (
  projectId: string
) => {
  const response = await api.get<Project>(
    `/projects/${projectId}`
  );

  return response.data;
};

export const createProjectApi = async (
  payload: CreateProjectPayload
) => {
  const response = await api.post<Project>(
    "/projects",
    payload
  );

  return response.data;
};

export const updateProjectApi = async (
  projectId: string,
  payload: UpdateProjectPayload
) => {
  const response = await api.patch<Project>(
    `/projects/${projectId}`,
    payload
  );

  return response.data;
};

export const deleteProjectApi = async (
  projectId: string
) => {
  await api.delete(
    `/projects/${projectId}`
  );
};

export const getProjectMembersApi = async (
  projectId: string
) => {
  const response =
    await api.get<ProjectMember[]>(
      `/projects/${projectId}/members`
    );

  return response.data;
};

export const addProjectMemberApi = async (
  projectId: string,
  payload: AddProjectMemberPayload
) => {
  const response =
    await api.post<ProjectMember>(
      `/projects/${projectId}/members`,
      payload
    );

  return response.data;
};

export const removeProjectMemberApi = async (
  projectId: string,
  userId: string
) => {
  await api.delete(
    `/projects/${projectId}/members/${userId}`
  );
};