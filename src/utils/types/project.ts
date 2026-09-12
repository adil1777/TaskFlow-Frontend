import { z } from "zod";
import type { createProjectSchema } from "../validations/projectSchema";

export type CreateProjectFormData = z.infer<
  typeof createProjectSchema
>;

export interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
}


