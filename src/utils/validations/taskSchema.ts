import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(200, "Task title cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(
      2000,
      "Description cannot exceed 2000 characters"
    )
    .optional(),

  status: z.enum([
    "todo",
    "in_progress",
    "review",
    "done",
  ]),

  priority: z.enum([
    "low",
    "medium",
    "high",
    "urgent",
  ]),

  dueDate: z
    .string()
    .optional(),
});

export type TaskFormData = z.infer<
  typeof taskSchema
>;