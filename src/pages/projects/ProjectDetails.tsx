import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import TaskFilters from "../../components/tasks/TaskFilters";
import TaskTable from "../../components/tasks/TaskTable";

import {
  useDeleteProject,
  useProject,
} from "../../hooks/useProjects";

import { useProjectTasks } from "../../hooks/useTasks";
import { useDebounce } from "../../hooks/useDebounce";

import { useAppSelector } from "../../redux/hooks";

import { ORG_ROLES } from "../../utils/types/role";

import type {
  TaskFilters as TaskFiltersType,
} from "../../utils/types/task";

/* =============================================================================
 * Constants
 * =============================================================================
 */

const TASKS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_DELAY = 400;

/* =============================================================================
 * Project Details
 * =============================================================================
 */

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const role = useAppSelector(
    (state) => state.organization.role
  );

  const isOrgAdmin =
    role === ORG_ROLES.ORG_ADMIN;

  /* --------------------------------------------------------------------------
   * Project
   * --------------------------------------------------------------------------
   */

  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useProject(projectId);

  const deleteProjectMutation =
    useDeleteProject();

  const isDeleting =
    deleteProjectMutation.isPending;

  /* --------------------------------------------------------------------------
   * Task State
   * --------------------------------------------------------------------------
   */

  const [taskPage, setTaskPage] =
    useState(1);

  const [filters, setFilters] =
    useState<TaskFiltersType>({});

  /*
   * Search is debounced so that we don't
   * make an API request on every keystroke.
   */
  const debouncedSearch = useDebounce(
    filters.search ?? "",
    SEARCH_DEBOUNCE_DELAY
  );

  /*
   * These are the filters actually
   * sent to the API.
   */
  const activeFilters =
    useMemo<TaskFiltersType>(() => {
      const search =
        debouncedSearch.trim();

      return {
        ...filters,
        search:
          search || undefined,
      };
    }, [
      filters,
      debouncedSearch,
    ]);

  /*
   * When filtering changes, always
   * start from the first page.
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

  /* --------------------------------------------------------------------------
   * Tasks
   * --------------------------------------------------------------------------
   */

  const {
    data: tasksData,
    isLoading: tasksLoading,
    isFetching: tasksFetching,
  } = useProjectTasks(
    projectId ?? "",
    taskPage,
    TASKS_PER_PAGE,
    activeFilters
  );

  const tasks =
    tasksData?.data ?? [];

  const totalTasks =
    tasksData?.total ?? 0;

  const totalTaskPages = Math.max(
    1,
    Math.ceil(
      totalTasks /
        TASKS_PER_PAGE
    )
  );

  /* --------------------------------------------------------------------------
   * Navigation
   * --------------------------------------------------------------------------
   */

  const handleBackToProjects =
    () => {
      navigate("/projects");
    };

  const handleTaskClick = (
    taskId: string
  ) => {
    navigate(`/tasks/${taskId}`);
  };

  /* --------------------------------------------------------------------------
   * Delete Project
   * --------------------------------------------------------------------------
   */

  const handleDelete =
    async () => {
      if (
        !projectId ||
        !isOrgAdmin ||
        isDeleting
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${project?.name}"? This action cannot be undone.`
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteProjectMutation.mutateAsync(
          projectId
        );

        navigate("/projects", {
          replace: true,
        });
      } catch (error) {
        console.error(
          "Failed to delete project:",
          error
        );
      }
    };

  /* --------------------------------------------------------------------------
   * Loading State
   * --------------------------------------------------------------------------
   */

  if (isLoading) {
    return (
      <ProjectDetailsSkeleton />
    );
  }

  /* --------------------------------------------------------------------------
   * Error State
   * --------------------------------------------------------------------------
   */

  if (
    isError ||
    !project
  ) {
    return (
      <ProjectDetailsError
        onBack={
          handleBackToProjects
        }
        onRetry={refetch}
        showRetry={isError}
      />
    );
  }

  /* --------------------------------------------------------------------------
   * Project Metadata
   * --------------------------------------------------------------------------
   */

  const createdDate =
    new Date(
      project.createdAt
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  /* --------------------------------------------------------------------------
   * Render
   * --------------------------------------------------------------------------
   */

  return (
    <div className="space-y-6">
      {/* ====================================================================
          Back Navigation
          ==================================================================== */}

      <button
        type="button"
        onClick={
          handleBackToProjects
        }
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
        <ArrowLeft
          size={17}
          aria-hidden="true"
        />

        <span>
          Back to Projects
        </span>
      </button>

      {/* ====================================================================
          Project Information
          ==================================================================== */}

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
        {/* ------------------------------------------------------------------
            Header
            ------------------------------------------------------------------ */}

        <div
          className="
            flex
            flex-col
            gap-6
            border-b
            border-slate-200
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
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
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
                  text-2xl
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >
                {project.name}
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500

                  dark:text-slate-400
                "
              >
                {project.description ||
                  "No description available for this project."}
              </p>
            </div>
          </div>

          {/* Project Actions */}

          <div
            className="
              flex
              shrink-0
              flex-wrap
              gap-2
            "
          >
            {/* Edit */}

            <button
              type="button"
              disabled
              title="Project editing is not available yet"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4 py-2
                text-sm
                font-medium
                text-slate-700
                transition-colors

                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
              "
            >
              <Pencil
                size={16}
                aria-hidden="true"
              />

              Edit
            </button>

            {/* Delete */}

            {isOrgAdmin && (
              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={
                  isDeleting
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-red-200
                  bg-white
                  px-4 py-2
                  text-sm
                  font-medium
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
                <Trash2
                  size={16}
                  aria-hidden="true"
                />

                {isDeleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Metadata
            ------------------------------------------------------------------ */}

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
            icon={
              <CalendarDays
                size={17}
                aria-hidden="true"
              />
            }
            label="Created"
            value={
              createdDate
            }
          />

          <ProjectMetadata
            label="Project ID"
            value={project.id}
            mono
          />

          <ProjectMetadata
            label="Organization"
            value={
              project.organization
                .name
            }
            mono
          />
        </div>
      </section>

      {/* ====================================================================
          Tasks
          ==================================================================== */}

      <section
        aria-labelledby="project-tasks-heading"
        className="mt-6"
      >
        {/* ------------------------------------------------------------------
            Tasks Header
            ------------------------------------------------------------------ */}

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
              Manage tasks belonging
              to this project.
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

        {/* ------------------------------------------------------------------
            Filters
            ------------------------------------------------------------------ */}

        <TaskFilters
          filters={filters}
          onChange={
            setFilters
          }
        />

        {/* ------------------------------------------------------------------
            Initial Loading
            ------------------------------------------------------------------ */}

        {tasksLoading ? (
          <TaskListSkeleton />
        ) : tasks.length === 0 ? (
          /* ---------------------------------------------------------------
             Empty State
             --------------------------------------------------------------- */

          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-300
              bg-white
              p-10
              text-center

              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <h3
              className="
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              {totalTasks === 0
                ? "No tasks yet"
                : "No tasks found"}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              {totalTasks ===
              0
                ? "Create your first task for this project."
                : "Try changing or clearing your filters."}
            </p>

            {totalTasks ===
              0 && (
              <button
                type="button"
                className="
                  mt-4
                  rounded-lg
                  bg-slate-900
                  px-4 py-2
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
                "
              >
                Create Task
              </button>
            )}
          </div>
        ) : (
          <>
            {/* --------------------------------------------------------------
                Task Table
                -------------------------------------------------------------- */}

            <div className="relative">
              <TaskTable
                tasks={tasks}
                onTaskClick={
                  handleTaskClick
                }
              />

              {/* Background fetching indicator */}

              {tasksFetching &&
                !tasksLoading && (
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

            {/* --------------------------------------------------------------
                Pagination
                -------------------------------------------------------------- */}

            {totalTaskPages >
              1 && (
              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* Result Count */}

                <p
                  className="
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Showing{" "}
                  <span
                    className="
                      font-medium
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {(taskPage -
                      1) *
                      TASKS_PER_PAGE +
                      1}
                  </span>{" "}
                  to{" "}
                  <span
                    className="
                      font-medium
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {Math.min(
                      taskPage *
                        TASKS_PER_PAGE,
                      totalTasks
                    )}
                  </span>{" "}
                  of{" "}
                  <span
                    className="
                      font-medium
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {totalTasks}
                  </span>{" "}
                  tasks
                </p>

                {/* Pagination Controls */}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={
                      taskPage ===
                        1 ||
                      tasksFetching
                    }
                    onClick={() =>
                      setTaskPage(
                        (
                          current
                        ) =>
                          Math.max(
                            1,
                            current -
                              1
                          )
                      )
                    }
                    className="
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      px-4 py-2
                      text-sm
                      font-medium
                      text-slate-700
                      transition-colors

                      hover:bg-slate-50

                      focus:outline-none
                      focus:ring-2
                      focus:ring-slate-400
                      focus:ring-offset-2

                      disabled:cursor-not-allowed
                      disabled:opacity-40

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                      dark:focus:ring-slate-600
                      dark:focus:ring-offset-slate-950
                    "
                  >
                    Previous
                  </button>

                  <span
                    className="
                      min-w-[90px]
                      text-center
                      text-sm
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    Page{" "}
                    <span
                      className="
                        font-medium
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {taskPage}
                    </span>{" "}
                    of{" "}
                    <span
                      className="
                        font-medium
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {
                        totalTaskPages
                      }
                    </span>
                  </span>

                  <button
                    type="button"
                    disabled={
                      taskPage ===
                        totalTaskPages ||
                      tasksFetching
                    }
                    onClick={() =>
                      setTaskPage(
                        (
                          current
                        ) =>
                          Math.min(
                            totalTaskPages,
                            current +
                              1
                          )
                      )
                    }
                    className="
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      px-4 py-2
                      text-sm
                      font-medium
                      text-slate-700
                      transition-colors

                      hover:bg-slate-50

                      focus:outline-none
                      focus:ring-2
                      focus:ring-slate-400
                      focus:ring-offset-2

                      disabled:cursor-not-allowed
                      disabled:opacity-40

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                      dark:focus:ring-slate-600
                      dark:focus:ring-offset-slate-950
                    "
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

/* =============================================================================
 * Project Metadata
 * =============================================================================
 */

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
          flex
          items-center
          gap-2
          text-slate-500

          dark:text-slate-400
        "
      >
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p
        title={value}
        className={`
          mt-2
          truncate
          text-sm
          font-medium
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

/* =============================================================================
 * Task List Skeleton
 * =============================================================================
 */

const TaskListSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white

        dark:border-slate-800
        dark:bg-slate-900
      "
      aria-label="Loading tasks"
    >
      {/* Table Header */}

      <div
        className="
          hidden
          border-b
          border-slate-200
          bg-slate-50
          px-5 py-4

          md:grid
          md:grid-cols-5
          md:gap-4

          dark:border-slate-800
          dark:bg-slate-800/60
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-3
              animate-pulse
              rounded
              bg-slate-200

              dark:bg-slate-700
            "
          />
        ))}
      </div>

      {/* Table Rows */}

      <div
        className="
          divide-y
          divide-slate-100

          dark:divide-slate-800
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              grid
              gap-4
              px-5 py-5

              md:grid-cols-5
              md:items-center
            "
          >
            {/* Task */}

            <div className="space-y-2">
              <div
                className="
                  h-4
                  w-36
                  animate-pulse
                  rounded
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded
                  bg-slate-100

                  dark:bg-slate-800
                "
              />
            </div>

            {/* Status */}

            <div
              className="
                h-6
                w-20
                animate-pulse
                rounded-full
                bg-slate-200

                dark:bg-slate-800
              "
            />

            {/* Priority */}

            <div
              className="
                h-6
                w-16
                animate-pulse
                rounded-full
                bg-slate-200

                dark:bg-slate-800
              "
            />

            {/* Assignee */}

            <div className="flex items-center gap-2">
              <div
                className="
                  h-8
                  w-8
                  animate-pulse
                  rounded-full
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              <div
                className="
                  h-4
                  w-20
                  animate-pulse
                  rounded
                  bg-slate-200

                  dark:bg-slate-800
                "
              />
            </div>

            {/* Due Date */}

            <div
              className="
                h-4
                w-24
                animate-pulse
                rounded
                bg-slate-200

                dark:bg-slate-800
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* =============================================================================
 * Project Details Skeleton
 * =============================================================================
 */

const ProjectDetailsSkeleton =
  () => {
    return (
      <div className="space-y-6">
        {/* Back Button */}

        <div
          className="
            h-9
            w-36
            animate-pulse
            rounded-lg
            bg-slate-200

            dark:bg-slate-800
          "
        />

        {/* Project Card */}

        <div
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
          {/* Project Header */}

          <div className="p-6">
            <div className="flex gap-4">
              {/* Icon */}

              <div
                className="
                  h-14
                  w-14
                  shrink-0
                  animate-pulse
                  rounded-xl
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              {/* Content */}

              <div className="flex-1">
                <div
                  className="
                    h-7
                    w-64
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />

                <div
                  className="
                    mt-4
                    h-4
                    w-full
                    max-w-2xl
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />

                <div
                  className="
                    mt-2
                    h-4
                    w-3/4
                    max-w-xl
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />
              </div>
            </div>
          </div>

          {/* Metadata */}

          <div
            className="
              grid
              gap-4
              border-t
              border-slate-200
              p-6

              sm:grid-cols-2
              lg:grid-cols-3

              dark:border-slate-800
            "
          >
            {Array.from({
              length: 3,
            }).map(
              (_, index) => (
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
              )
            )}
          </div>
        </div>

        {/* Tasks */}

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

/* =============================================================================
 * Project Details Error
 * =============================================================================
 */

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
        border
        border-red-200
        bg-red-50
        p-6

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
          mt-1
          text-sm
          text-red-600

          dark:text-red-400
        "
      >
        The project may have
        been deleted or you
        don't have access to it.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-slate-900
            px-4 py-2
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
          "
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
          />

          Back to Projects
        </button>

        {/* Retry */}

        {showRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4 py-2
              text-sm
              font-medium
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