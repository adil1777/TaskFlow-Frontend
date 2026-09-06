export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

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
