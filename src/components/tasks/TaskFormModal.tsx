import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  type TaskFormData,
} from "../../utils/validations/taskSchema";

import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";

import type { Task } from "../../utils/types/task";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  task?: Task | null;
}

const DEFAULT_VALUES: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

const TaskFormModal = ({
  open,
  onClose,
  projectId,
  task,
}: TaskFormModalProps) => {
  const isEditMode = Boolean(task);

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const isSubmitting =
    createTaskMutation.isPending || updateTaskMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      });

      return;
    }

    reset(DEFAULT_VALUES);
  }, [open, task, reset]);

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    reset(DEFAULT_VALUES);
    onClose();
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEditMode && task) {
        await updateTaskMutation.mutateAsync({
          taskId: task.id,
          payload: {
            title: data.title,
            description: data.description || undefined,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate || null,
          },
        });
      } else {
        await createTaskMutation.mutateAsync({
          projectId,
          payload: {
            title: data.title,
            description: data.description || undefined,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate || undefined,
          },
        });
      }

      reset(DEFAULT_VALUES);
      onClose();
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} task:`,
        error
      );
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <h2
              id="task-modal-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEditMode
                ? "Update task information."
                : "Create a new task for this project."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close task modal"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Task Title
            </label>

            <input
              id="task-title"
              {...register("title")}
              type="text"
              placeholder="e.g. Implement authentication API"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Description
            </label>

            <textarea
              id="task-description"
              {...register("description")}
              rows={4}
              placeholder="Describe the task..."
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Status + Priority */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Status
              </label>

              <select
                id="task-status"
                {...register("status")}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Priority
              </label>

              <select
                id="task-priority"
                {...register("priority")}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="task-due-date"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Due Date
            </label>

            <input
              id="task-due-date"
              {...register("dueDate")}
              type="date"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
