import { api } from "./axios";

import type {
  AddOrganizationMemberPayload,
  CreateOrganizationPayload,
  Organization,
  OrganizationListItem,
  OrganizationMember,
  UpdateOrganizationMemberPayload,
  UpdateOrganizationPayload,
} from "../utils/types/organization";

export const getOrganizations = async () => {
  const response = await api.get<OrganizationListItem[]>("/organizations");

  return response.data;
};

export const getOrganizationById = async (organizationId: string) => {
  const response = await api.get<Organization>(
    `/organizations/${organizationId}`
  );

  return response.data;
};

export const createOrganization = async (
  payload: CreateOrganizationPayload
) => {
  const response = await api.post<Organization>("/organizations", payload);

  return response.data;
};

export const updateOrganization = async (
  organizationId: string,
  payload: UpdateOrganizationPayload
) => {
  const response = await api.patch<Organization>(
    `/organizations/${organizationId}`,
    payload
  );

  return response.data;
};

export const deleteOrganization = async (organizationId: string) => {
  await api.delete(`/organizations/${organizationId}`);
};

export const getOrganizationMembers = async (organizationId: string) => {
  const response = await api.get<OrganizationMember[]>(
    `/${organizationId}/members`
  );

  return response.data;
};

export const addOrganizationMember = async (
  organizationId: string,
  payload: AddOrganizationMemberPayload
) => {
  const response = await api.post<OrganizationMember>(
    `/${organizationId}/members`,
    payload
  );

  return response.data;
};

export const updateOrganizationMember = async (
  organizationId: string,
  userId: string,
  payload: UpdateOrganizationMemberPayload
) => {
  const response = await api.patch<OrganizationMember>(
    `/${organizationId}/members/${userId}`,
    payload
  );

  return response.data;
};

export const removeOrganizationMember = async (
  organizationId: string,
  userId: string
) => {
  await api.delete(`/${organizationId}/members/${userId}`);
};
