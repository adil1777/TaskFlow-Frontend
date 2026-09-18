import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Pencil,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useTask } from "../../hooks/useTasks";

import TaskStatusBadge from "../../components/tasks/TaskStatusBadge";
import TaskPriorityBadge from "../../components/tasks/TaskPriorityBadge";
import TaskAssignment from "../../components/tasks/TaskAssignment";
import CommentSection from "../../components/comments/CommentSection";
import TaskFormModal from "../../components/tasks/TaskFormModal";

const TaskDetails = () => {
  const navigate = useNavigate();

  const { taskId } = useParams<{
    taskId: string;
  }>();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useTask(taskId || "");

  /* --------------------------------------------------
   * Invalid Task ID
   * -------------------------------------------------- */

  if (!taskId) {
    return (
      <div
        className="
          rounded-xl
          border border-red-200
          bg-red-50 p-6
          dark:border-red-900/50
          dark:bg-red-950/30
        "
      >
        <h2
          className="
            font-semibold
            text-red-700
            dark:text-red-400
          "
        >
          Invalid task
        </h2>

        <p
          className="
            mt-1 text-sm
            text-red-600
            dark:text-red-400
          "
        >
          The task ID provided is invalid.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            mt-4 inline-flex
            items-center gap-2
            rounded-lg
            bg-slate-900 px-4 py-2.5
            text-sm font-medium text-white
            transition hover:bg-slate-800
            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-200
          "
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }

  /* --------------------------------------------------
   * Loading State
   * -------------------------------------------------- */

  if (isLoading) {
    return (
      <div>
        {/* Header Skeleton */}
        <div
          className="
            mb-8 flex flex-col gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                mt-1 h-9 w-9
                animate-pulse
                rounded-lg
                bg-slate-200
                dark:bg-slate-800
              "
            />

            <div>
              <div
                className="
                  h-4 w-24
                  animate-pulse
                  rounded
                  bg-slate-200
                  dark:bg-slate-800
                "
              />

              <div
                className="
                  mt-2 h-8 w-64
                  animate-pulse
                  rounded
                  bg-slate-200
                  dark:bg-slate-800
                "
              />
            </div>
          </div>

          <div
            className="
              h-10 w-28
              animate-pulse
              rounded-lg
              bg-slate-200
              dark:bg-slate-800
            "
          />
        </div>

        {/* Information Skeleton */}
        <div
          className="
            rounded-xl
            border border-slate-200
            bg-white p-6
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div
            className="
              h-6 w-40
              animate-pulse
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />

          <div className="mt-5 space-y-2">
            <div
              className="
                h-4 w-full
                animate-pulse
                rounded
                bg-slate-200
                dark:bg-slate-800
              "
            />

            <div
              className="
                h-4 w-5/6
                animate-pulse
                rounded
                bg-slate-200
                dark:bg-slate-800
              "
            />

            <div
              className="
                h-4 w-2/3
                animate-pulse
                rounded
                bg-slate-200
                dark:bg-slate-800
              "
            />
          </div>

          <div
            className="
              mt-6 grid gap-4
              sm:grid-cols-3
            "
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
                  h-24
                  animate-pulse
                  rounded-xl
                  bg-slate-100
                  dark:bg-slate-800
                "
              />
            ))}
          </div>
        </div>

        {/* Assignment Skeleton */}
        <div
          className="
            mt-5 h-40
            animate-pulse
            rounded-xl
            bg-slate-200
            dark:bg-slate-800
          "
        />

        {/* Comments Skeleton */}
        <div
          className="
            mt-5 h-56
            animate-pulse
            rounded-xl
            bg-slate-200
            dark:bg-slate-800
          "
        />
      </div>
    );
  }

  /* --------------------------------------------------
   * Error State
   * -------------------------------------------------- */

  if (isError || !task) {
    return (
      <div
        className="
          rounded-xl
          border border-red-200
          bg-red-50 p-6
          dark:border-red-900/50
          dark:bg-red-950/30
        "
      >
        <h2
          className="
            font-semibold
            text-red-700
            dark:text-red-400
          "
        >
          Unable to load task
        </h2>

        <p
          className="
            mt-1 text-sm
            text-red-600
            dark:text-red-400
          "
        >
          Something went wrong while loading this task.
          The task may not exist or you may not have
          access to it.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="
              rounded-lg
              bg-red-600 px-4 py-2.5
              text-sm font-medium text-white
              transition hover:bg-red-700
            "
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center gap-2
              rounded-lg
              border border-slate-300
              bg-white px-4 py-2.5
              text-sm font-medium
              text-slate-700
              transition hover:bg-slate-50
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
   * Page
   * -------------------------------------------------- */

  return (
    <div>
      {/* ------------------------------------------------
          Header
      ------------------------------------------------ */}

      <div
        className="
          mb-8 flex flex-col gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex min-w-0 items-start gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="
              mt-1 shrink-0
              rounded-lg p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0">
            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Task Details
            </p>

            <h1
              className="
                mt-1 truncate
                text-2xl font-bold
                text-slate-900
                dark:text-white
              "
              title={task.title}
            >
              {task.title}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditModalOpen(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            border border-slate-300
            bg-white px-4 py-2.5
            text-sm font-medium
            text-slate-700
            transition
            hover:bg-slate-50
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Pencil size={16} />
          Edit Task
        </button>
      </div>

      {/* ------------------------------------------------
          Task Information
      ------------------------------------------------ */}

      <section
        className="
          rounded-xl
          border border-slate-200
          bg-white p-6
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <h2
          className="
            text-lg font-semibold
            text-slate-900
            dark:text-white
          "
        >
          Task Information
        </h2>

        {/* Description */}

        <div className="mt-5">
          <p
            className="
              mb-2 text-sm font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            Description
          </p>

          <p
            className="
              whitespace-pre-wrap
              text-sm leading-6
              text-slate-700
              dark:text-slate-300
            "
          >
            {task.description || "No description provided."}
          </p>
        </div>

        {/* Metadata */}

        <div
          className="
            mt-6 grid gap-4
            sm:grid-cols-3
          "
        >
          {/* Status */}

          <div
            className="
              rounded-xl
              bg-slate-50 p-4
              dark:bg-slate-800/60
            "
          >
            <p
              className="
                text-xs font-medium
                uppercase tracking-wide
                text-slate-400
              "
            >
              Status
            </p>

            <div className="mt-2">
              <TaskStatusBadge status={task.status} />
            </div>
          </div>

          {/* Priority */}

          <div
            className="
              rounded-xl
              bg-slate-50 p-4
              dark:bg-slate-800/60
            "
          >
            <p
              className="
                text-xs font-medium
                uppercase tracking-wide
                text-slate-400
              "
            >
              Priority
            </p>

            <div className="mt-2">
              <TaskPriorityBadge
                priority={task.priority}
              />
            </div>
          </div>

          {/* Due Date */}

          <div
            className="
              rounded-xl
              bg-slate-50 p-4
              dark:bg-slate-800/60
            "
          >
            <p
              className="
                text-xs font-medium
                uppercase tracking-wide
                text-slate-400
              "
            >
              Due Date
            </p>

            <div
              className="
                mt-2 flex items-center
                gap-2 text-sm
                text-slate-700
                dark:text-slate-300
              "
            >
              <CalendarDays
                size={16}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />

              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          Assignment
      ------------------------------------------------ */}

      <section
        className="
          mt-5
          rounded-xl
          border border-slate-200
          bg-white p-6
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <TaskAssignment task={task} />
      </section>

      {/* ------------------------------------------------
          Comments
      ------------------------------------------------ */}

      <div className="mt-5">
        <CommentSection taskId={task.id} />
      </div>

      {/* ------------------------------------------------
          Edit Task Modal
      ------------------------------------------------ */}

      <TaskFormModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        projectId={task.projectId}
        task={task}
      />
    </div>
  );
};

export default TaskDetails;
