import type { TaskPriority, TaskStatus } from "../constants/task.constants";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}