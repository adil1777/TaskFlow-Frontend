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
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        px-4 py-6
        backdrop-blur-[2px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="
          flex max-h-[90vh]
          w-full max-w-xl
          flex-col
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          shadow-xl
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            flex shrink-0
            items-start justify-between
            border-b
            border-slate-200
            px-6 py-5
            dark:border-slate-800
          "
        >
          <div>
            <h2
              id="task-modal-title"
              className="
                text-lg font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>

            <p
              className="
                mt-1 text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
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
            className="
              rounded-lg p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
              dark:focus:ring-slate-600
            "
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >
          <div className="space-y-5">
            {/* Title */}

            <div>
              <label
                htmlFor="task-title"
                className="
                  mb-1.5 block
                  text-sm font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Task Title
              </label>

              <input
                id="task-title"
                {...register("title")}
                type="text"
                placeholder="e.g. Implement authentication API"
                disabled={isSubmitting}
                className="
                  w-full rounded-lg
                  border border-slate-300
                  bg-white px-4 py-2.5
                  text-sm text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-slate-500
                  focus:ring-2
                  focus:ring-slate-200
                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-500
                  dark:focus:border-slate-500
                  dark:focus:ring-slate-700
                  dark:disabled:bg-slate-800/60
                "
              />

              {errors.title && (
                <p
                  className="
                    mt-1.5 text-sm
                    text-red-500
                    dark:text-red-400
                  "
                >
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}

            <div>
              <label
                htmlFor="task-description"
                className="
                  mb-1.5 block
                  text-sm font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Description
              </label>

              <textarea
                id="task-description"
                {...register("description")}
                rows={4}
                placeholder="Describe the task..."
                disabled={isSubmitting}
                className="
                  w-full resize-none
                  rounded-lg
                  border border-slate-300
                  bg-white px-4 py-2.5
                  text-sm text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-slate-500
                  focus:ring-2
                  focus:ring-slate-200
                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-500
                  dark:focus:border-slate-500
                  dark:focus:ring-slate-700
                "
              />

              {errors.description && (
                <p
                  className="
                    mt-1.5 text-sm
                    text-red-500
                    dark:text-red-400
                  "
                >
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status + Priority */}

            <div
              className="
                grid gap-4
                sm:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="task-status"
                  className="
                    mb-1.5 block
                    text-sm font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Status
                </label>

                <select
                  id="task-status"
                  {...register("status")}
                  disabled={isSubmitting}
                  className="
                    w-full rounded-lg
                    border border-slate-300
                    bg-white px-3 py-2.5
                    text-sm text-slate-900
                    outline-none
                    transition
                    focus:border-slate-500
                    focus:ring-2
                    focus:ring-slate-200
                    disabled:cursor-not-allowed
                    disabled:bg-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:focus:border-slate-500
                    dark:focus:ring-slate-700
                  "
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
                  className="
                    mb-1.5 block
                    text-sm font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Priority
                </label>

                <select
                  id="task-priority"
                  {...register("priority")}
                  disabled={isSubmitting}
                  className="
                    w-full rounded-lg
                    border border-slate-300
                    bg-white px-3 py-2.5
                    text-sm text-slate-900
                    outline-none
                    transition
                    focus:border-slate-500
                    focus:ring-2
                    focus:ring-slate-200
                    disabled:cursor-not-allowed
                    disabled:bg-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:focus:border-slate-500
                    dark:focus:ring-slate-700
                  "
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
                className="
                  mb-1.5 block
                  text-sm font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Due Date
              </label>

              <input
                id="task-due-date"
                {...register("dueDate")}
                type="date"
                disabled={isSubmitting}
                className="
                  w-full rounded-lg
                  border border-slate-300
                  bg-white px-4 py-2.5
                  text-sm text-slate-900
                  outline-none
                  transition
                  focus:border-slate-500
                  focus:ring-2
                  focus:ring-slate-200
                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:border-slate-500
                  dark:focus:ring-slate-700
                "
              />

              {errors.dueDate && (
                <p
                  className="
                    mt-1.5 text-sm
                    text-red-500
                    dark:text-red-400
                  "
                >
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              mt-6 flex
              justify-end gap-3
              border-t
              border-slate-100
              pt-5
              dark:border-slate-800
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="
                rounded-lg
                border border-slate-300
                bg-white px-4 py-2.5
                text-sm font-medium
                text-slate-700
                transition
                hover:bg-slate-50
                focus:outline-none
                focus:ring-2
                focus:ring-slate-300
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:bg-slate-800
                dark:focus:ring-slate-600
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-lg
                bg-slate-900 px-5 py-2.5
                text-sm font-medium
                text-white
                transition
                hover:bg-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-slate-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-slate-200
                dark:focus:ring-slate-500
              "
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
