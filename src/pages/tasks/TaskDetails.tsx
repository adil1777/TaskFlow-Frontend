import {
  ArrowLeft,
  CalendarDays,
  Pencil,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useTask,
} from "../../hooks/useTasks";

import TaskStatusBadge from "../../components/tasks/TaskStatusBadge";
import TaskPriorityBadge from "../../components/tasks/TaskPriorityBadge";
import TaskAssignment from "../../components/tasks/TaskAssignment";
import CommentSection from "../../components/comments/CommentSection";
import TaskFormModal from "../../components/tasks/TaskFormModal";

const TaskDetails = () => {
  const navigate =
    useNavigate();

  const { taskId } =
    useParams<{
      taskId: string;
    }>();

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useTask(taskId || "");

  if (!taskId) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">
          Invalid task ID.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-1/3 rounded bg-slate-200" />

          <div className="h-48 rounded-2xl bg-slate-200" />

          <div className="h-40 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Unable to load task
          </h2>

          <p className="mt-1 text-sm text-red-600">
            The task may not exist or you may not
            have access to it.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mt-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="text-sm text-slate-500">
              Task Details
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {task.title}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setEditModalOpen(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil size={16} />
          Edit Task
        </button>
      </div>

      {/* Task Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Task Information
        </h2>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-slate-500">
            Description
          </p>

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {task.description ||
              "No description provided."}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>

            <div className="mt-2">
              <TaskStatusBadge
                status={task.status}
              />
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Priority
            </p>

            <div className="mt-2">
              <TaskPriorityBadge
                priority={task.priority}
              />
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Due Date
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
              <CalendarDays size={16} />

              {task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No due date"}
            </div>
          </div>
        </div>
      </section>

      {/* Assignment */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <TaskAssignment task={task} />
      </section>

      {/* Comments */}
      <CommentSection taskId={task.id} />

      {/* Edit Modal */}
      <TaskFormModal
        open={editModalOpen}
        onClose={() =>
          setEditModalOpen(false)
        }
        projectId={task.projectId}
        task={task}
      />
    </div>
  );
};

export default TaskDetails;