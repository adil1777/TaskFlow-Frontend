import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useDeleteProject, useProject } from "../../hooks/useProjects";
import { useAppSelector } from "../../redux/hooks";
import { ORG_ROLES } from "../../utils/types/role";
import { useProjectTasks } from "../../hooks/useTasks";
import TaskTable from "../../components/tasks/TaskTable";
import { useState } from "react";

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const role = useAppSelector((state) => state.organization.role);

  const { data: project, isLoading, isError, refetch } = useProject(projectId);

  const deleteProjectMutation = useDeleteProject();

  const isOrgAdmin = role === ORG_ROLES.ORG_ADMIN;

  const isDeleting = deleteProjectMutation.isPending;

  const [taskPage, setTaskPage] = useState(1);

  const { data: tasksData, isLoading: tasksLoading } = useProjectTasks(
    projectId || "",
    taskPage,
    10
  );

  const tasks = tasksData?.data || [];

  const totalTasks = tasksData?.total || 0;

  const totalTaskPages = Math.ceil(totalTasks / 10);

  const handleBackToProjects = () => {
    navigate("/projects");
  };

  const handleDelete = async () => {
    if (!projectId || !isOrgAdmin || isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project?.name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectMutation.mutateAsync(projectId);

      navigate("/projects", {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  /*
   * Loading State
   */
  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  /*
   * Error State
   */
  if (isError || !project) {
    return (
      <ProjectDetailsError
        onBack={handleBackToProjects}
        onRetry={refetch}
        showRetry={isError}
      />
    );
  }

  const createdDate = new Date(project.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <button
        type="button"
        onClick={handleBackToProjects}
        className="
          inline-flex items-center gap-2
          rounded-lg px-3 py-2
          text-sm font-medium
          text-slate-600
          transition-colors
          hover:bg-slate-100
          hover:text-slate-900
          focus:outline-none
          focus:ring-2
          focus:ring-slate-400
          focus:ring-offset-2

          dark:text-slate-300
          dark:hover:bg-slate-800
          dark:hover:text-white
          dark:focus:ring-slate-600
          dark:focus:ring-offset-slate-950
        "
      >
        <ArrowLeft size={17} aria-hidden="true" />

        <span>Back to Projects</span>
      </button>

      {/* Project Information */}
      <section
        aria-labelledby="project-details-heading"
        className="
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <div
          className="
            flex flex-col gap-6
            border-b border-slate-200
            p-6
            lg:flex-row
            lg:items-start
            lg:justify-between

            dark:border-slate-800
          "
        >
          {/* Project Identity */}
          <div className="flex min-w-0 gap-4">
            <div
              className="
                flex h-14 w-14
                shrink-0
                items-center justify-center
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
              "
              aria-hidden="true"
            >
              <FolderKanban
                size={26}
                className="
                  text-slate-700
                  dark:text-slate-300
                "
              />
            </div>

            <div className="min-w-0">
              <h1
                id="project-details-heading"
                className="
                  break-words
                  text-2xl font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {project.name}
              </h1>

              <p
                className="
                  mt-2 max-w-2xl
                  text-sm leading-6
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {project.description ||
                  "No description available for this project."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
              flex shrink-0
              flex-wrap gap-2
            "
          >
            {/* Edit */}
            <button
              type="button"
              disabled
              title="Project editing is not available yet"
              className="
                inline-flex
                items-center gap-2
                rounded-lg
                border border-slate-300
                bg-white
                px-4 py-2
                text-sm font-medium
                text-slate-700
                transition-colors
                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
              "
            >
              <Pencil size={16} aria-hidden="true" />
              Edit
            </button>

            {/* Delete */}
            {isOrgAdmin && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="
                  inline-flex
                  items-center gap-2
                  rounded-lg
                  border border-red-200
                  bg-white
                  px-4 py-2
                  text-sm font-medium
                  text-red-600
                  transition-colors
                  hover:bg-red-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                  focus:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:border-red-900/60
                  dark:bg-slate-900
                  dark:text-red-400
                  dark:hover:bg-red-950/30
                  dark:focus:ring-red-700
                  dark:focus:ring-offset-slate-950
                "
              >
                <Trash2 size={16} aria-hidden="true" />

                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div
          className="
            grid gap-4 p-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <ProjectMetadata
            icon={<CalendarDays size={17} aria-hidden="true" />}
            label="Created"
            value={createdDate}
          />

          <ProjectMetadata label="Project ID" value={project.id} mono />

          <ProjectMetadata
            label="Organization"
            value={project.organization.name}
            mono
          />
        </div>
      </section>

      {/* Tasks */}
      <div className="mt-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage tasks belonging to this project.
            </p>
          </div>

          <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
            + Add Task
          </button>
        </div>

        {tasksLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="font-semibold text-slate-900">No tasks yet</h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first task for this project.
            </p>

            <button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Create Task
            </button>
          </div>
        ) : (
          <>
            <TaskTable
              tasks={tasks}
              onTaskClick={(taskId) => navigate(`/tasks/${taskId}`)}
            />

            {/* Pagination */}
            {totalTaskPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  disabled={taskPage === 1}
                  onClick={() => setTaskPage((current) => current - 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {taskPage} of {totalTaskPages}
                </span>

                <button
                  disabled={taskPage === totalTaskPages}
                  onClick={() => setTaskPage((current) => current + 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface ProjectMetadataProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

const ProjectMetadata = ({
  icon,
  label,
  value,
  mono = false,
}: ProjectMetadataProps) => {
  return (
    <div
      className="
        rounded-lg
        bg-slate-50
        p-4
        dark:bg-slate-800/60
      "
    >
      <div
        className="
          flex items-center gap-2
          text-slate-500
          dark:text-slate-400
        "
      >
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p
        title={value}
        className={`
          mt-2 truncate
          text-sm font-medium
          text-slate-900
          dark:text-slate-200
          ${mono ? "font-mono" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
};

const ProjectDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div
        className="
          h-9 w-36
          animate-pulse
          rounded-lg
          bg-slate-200
          dark:bg-slate-800
        "
      />

      <div
        className="
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="p-6">
          <div className="flex gap-4">
            <div
              className="
                h-14 w-14
                shrink-0
                animate-pulse
                rounded-xl
                bg-slate-200
                dark:bg-slate-800
              "
            />

            <div className="flex-1">
              <div
                className="
                  h-7 w-64
                  animate-pulse
                  rounded
                  bg-slate-200
                  dark:bg-slate-800
                "
              />

              <div
                className="
                  mt-4 h-4
                  w-full max-w-2xl
                  animate-pulse
                  rounded
                  bg-slate-200
                  dark:bg-slate-800
                "
              />

              <div
                className="
                  mt-2 h-4
                  w-3/4 max-w-xl
                  animate-pulse
                  rounded
                  bg-slate-200
                  dark:bg-slate-800
                "
              />
            </div>
          </div>
        </div>

        <div
          className="
            grid gap-4
            border-t border-slate-200
            p-6
            sm:grid-cols-2
            lg:grid-cols-3
            dark:border-slate-800
          "
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                  h-24
                  animate-pulse
                  rounded-lg
                  bg-slate-100
                  dark:bg-slate-800
                "
            />
          ))}
        </div>
      </div>

      <div
        className="
          h-52
          animate-pulse
          rounded-xl
          bg-slate-200
          dark:bg-slate-800
        "
      />
    </div>
  );
};

interface ProjectDetailsErrorProps {
  onBack: () => void;
  onRetry: () => void;
  showRetry: boolean;
}

const ProjectDetailsError = ({
  onBack,
  onRetry,
  showRetry,
}: ProjectDetailsErrorProps) => {
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
        Project not found
      </h2>

      <p
        className="
          mt-1 text-sm
          text-red-600
          dark:text-red-400
        "
      >
        The project may have been deleted or you don't have access to it.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex
            items-center gap-2
            rounded-lg
            bg-slate-900
            px-4 py-2
            text-sm font-medium
            text-white
            transition-colors
            hover:bg-slate-800
            focus:outline-none
            focus:ring-2
            focus:ring-slate-400
            focus:ring-offset-2

            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-200
          "
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Projects
        </button>

        {showRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              rounded-lg
              border border-slate-300
              bg-white
              px-4 py-2
              text-sm font-medium
              text-slate-700
              transition-colors
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
              focus:ring-offset-2

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
