import { ArrowLeft, CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectDetailsError from "../../components/projects/ProjectDetailsError";
import ProjectDetailsHeader from "../../components/projects/ProjectDetailsHeader";
import ProjectDetailsSkeleton from "../../components/projects/ProjectDetailsSkeleton";
import ProjectMetadata from "../../components/projects/ProjectMetadata";

import EmptyTasksState from "../../components/tasks/EmptyTasksState";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskListSkeleton from "../../components/tasks/TaskListSkeleton";
import TaskPagination from "../../components/tasks/TaskPagination";
import TaskTable from "../../components/tasks/TaskTable";

import { useDebounce } from "../../hooks/useDebounce";
import { useDeleteProject, useProject } from "../../hooks/useProjects";
import { useProjectTasks } from "../../hooks/useTasks";

import { useAppSelector } from "../../redux/hooks";

import { ORG_ROLES } from "../../utils/types/role";
import type { TaskFilters as TaskFiltersType } from "../../utils/types/task";

const TASKS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_DELAY = 400;

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const role = useAppSelector((state) => state.organization.role);

  const isOrgAdmin = role === ORG_ROLES.ORG_ADMIN;

  const { data: project, isLoading, isError, refetch } = useProject(projectId);

  const deleteProjectMutation = useDeleteProject();

  const isDeleting = deleteProjectMutation.isPending;

  const [taskPage, setTaskPage] = useState(1);

  const [filters, setFilters] = useState<TaskFiltersType>({});

  const debouncedSearch = useDebounce(
    filters.search ?? "",
    SEARCH_DEBOUNCE_DELAY
  );

  /**
   * Filters sent to the API.
   *
   * Search is debounced separately so typing
   * does not trigger an API request for every
   * character.
   */
  const activeFilters = useMemo<TaskFiltersType>(() => {
    const search = debouncedSearch.trim();

    return {
      ...filters,
      search: search || undefined,
    };
  }, [filters, debouncedSearch]);

  /**
   * Reset pagination whenever the active
   * filters change.
   */
  useEffect(() => {
    setTaskPage(1);
  }, [
    filters.status,
    filters.priority,
    filters.dueDateFrom,
    filters.dueDateTo,
    debouncedSearch,
  ]);

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isFetching: tasksFetching,
  } = useProjectTasks(projectId ?? "", taskPage, TASKS_PER_PAGE, activeFilters);

  const tasks = tasksData?.data ?? [];
  const totalTasks = tasksData?.total ?? 0;

  const totalTaskPages = Math.max(1, Math.ceil(totalTasks / TASKS_PER_PAGE));

  const handleBackToProjects = () => {
    navigate("/projects");
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
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

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

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
      {/* Back Navigation */}
      <button
        type="button"
        onClick={handleBackToProjects}
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          px-3 py-2
          text-sm
          font-medium
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

      {/* ------------------------------------------------------------------
          Project Information
          ------------------------------------------------------------------ */}
      <section
        aria-labelledby="project-details-heading"
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <ProjectDetailsHeader
          projectName={project.name}
          description={project.description}
          isOrgAdmin={isOrgAdmin}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />

        <div
          className="
            grid
            gap-4
            p-6
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

      {/* ------------------------------------------------------------------
          Tasks
          ------------------------------------------------------------------ */}
      <section aria-labelledby="project-tasks-heading" className="mt-6">
        {/* Tasks Header */}
        <div
          className="
            mb-4
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2
              id="project-tasks-heading"
              className="
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Tasks
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage tasks belonging to this project.
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-slate-900
              px-4 py-2.5
              text-sm
              font-medium
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
              dark:focus:ring-slate-500
              dark:focus:ring-offset-slate-950
            "
          >
            + Add Task
          </button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onChange={setFilters} />

        {/* Tasks Content */}
        {tasksLoading ? (
          <TaskListSkeleton />
        ) : tasks.length === 0 ? (
          <EmptyTasksState hasTasks={totalTasks > 0} />
        ) : (
          <>
            <div className="relative">
              <TaskTable tasks={tasks} onTaskClick={handleTaskClick} />

              {tasksFetching && !tasksLoading && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-0.5
                    overflow-hidden
                    rounded-t-xl
                    bg-slate-200
                    dark:bg-slate-800
                  "
                  aria-hidden="true"
                >
                  <div
                    className="
                      h-full
                      w-1/3
                      animate-pulse
                      bg-slate-500
                      dark:bg-slate-400
                    "
                  />
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalTaskPages > 1 && (
              <TaskPagination
                currentPage={taskPage}
                totalPages={totalTaskPages}
                totalTasks={totalTasks}
                pageSize={TASKS_PER_PAGE}
                isFetching={tasksFetching}
                onPrevious={() =>
                  setTaskPage((current) => Math.max(1, current - 1))
                }
                onNext={() =>
                  setTaskPage((current) =>
                    Math.min(totalTaskPages, current + 1)
                  )
                }
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ProjectDetails;
