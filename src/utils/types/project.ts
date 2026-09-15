import { z } from "zod";
import type { createProjectSchema } from "../validations/projectSchema";

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
  };
}

export interface ProjectsResponse {
  projects: Project[];
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
