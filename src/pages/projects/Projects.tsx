import { useEffect, useState } from "react";

import {
  ArrowRight,
  FolderKanban,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useDeleteProject, useProjects } from "../../hooks/useProjects";

import { useAppSelector } from "../../redux/hooks";

import { ORG_ROLES } from "../../utils/types/role";

import CreateProjectModal from "../../components/projects/CreateProjectModal";

const PROJECTS_PER_PAGE = 9;

const Projects = () => {
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [page, setPage] = useState(1);

  const role = useAppSelector((state) => state.organization.role);

  const { data, isLoading, isError, isFetching, refetch } = useProjects(
    page,
    PROJECTS_PER_PAGE
  );

  const deleteProjectMutation = useDeleteProject();

  const projects = data?.projects ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.max(1, Math.ceil(total / PROJECTS_PER_PAGE));

  const isOrgAdmin = role === ORG_ROLES.ORG_ADMIN;

  useEffect(() => {
    if (!isLoading && page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages, isLoading]);

  const handleDelete = async (projectId: string) => {
    if (deleteProjectMutation.isPending) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectMutation.mutateAsync(projectId);

      if (projects.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <div
            className="
              h-8 w-40 animate-pulse
              rounded bg-slate-200
              dark:bg-slate-800
            "
          />

          <div
            className="
              mt-2 h-4 w-64 animate-pulse
              rounded bg-slate-200
              dark:bg-slate-800
            "
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-48 animate-pulse
                rounded-xl
                bg-slate-200
                dark:bg-slate-800
              "
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
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
          Failed to load projects
        </h2>

        <p
          className="
            mt-1 text-sm
            text-red-600
            dark:text-red-400
          "
        >
          Something went wrong while loading your projects.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="
            mt-4 rounded-lg
            bg-red-600 px-4 py-2
            text-sm font-medium text-white
            transition hover:bg-red-700
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        className="
          mb-8 flex flex-col gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            Projects
          </h1>

          <p
            className="
              mt-1 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage all projects in your organization.
          </p>
        </div>

        {isOrgAdmin && (
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-lg
              bg-slate-900 px-4 py-2.5
              text-sm font-medium text-white
              transition hover:bg-slate-800
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-200
            "
          >
            <Plus size={18} />
            New Project
          </button>
        )}
      </div>

      {isFetching && !isLoading && (
        <div
          className="
            mb-4 text-xs
            text-slate-400
          "
        >
          Updating projects...
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 ? (
        <div
          className="
            flex min-h-[400px]
            flex-col items-center
            justify-center
            rounded-xl
            border border-dashed
            border-slate-300
            bg-white px-6
            text-center
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-full
              bg-slate-100
              dark:bg-slate-800
            "
          >
            <FolderKanban
              size={26}
              className="
                text-slate-500
                dark:text-slate-400
              "
            />
          </div>

          <h2
            className="
              mt-4 text-lg font-semibold
              text-slate-900
              dark:text-white
            "
          >
            No projects yet
          </h2>

          <p
            className="
              mt-1 max-w-sm text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {isOrgAdmin
              ? "Create your first project to start managing tasks and collaboration."
              : "There are currently no projects available in your organization."}
          </p>

          {isOrgAdmin && (
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="
                mt-5 inline-flex
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
              <Plus size={18} />
              Create Project
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Project Cards */}
          <div
            className="
              grid gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="
                  group rounded-xl
                  border border-slate-200
                  bg-white p-5
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:shadow-slate-950/40
                "
              >
                <div className="flex items-start justify-between">
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-lg
                      bg-slate-100
                      dark:bg-slate-800
                    "
                  >
                    <FolderKanban
                      size={21}
                      className="
                        text-slate-700
                        dark:text-slate-300
                      "
                    />
                  </div>

                  {isOrgAdmin && (
                    <button
                      type="button"
                      aria-label={`Project actions for ${project.name}`}
                      className="
                        rounded-lg p-2
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                        dark:hover:bg-slate-800
                        dark:hover:text-slate-200
                      "
                    >
                      <MoreVertical size={18} />
                    </button>
                  )}
                </div>

                <div className="mt-5">
                  <h2
                    className="
                      truncate text-lg
                      font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {project.name}
                  </h2>

                  <p
                    className="
                      mt-2 line-clamp-3
                      min-h-[60px] text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {project.description || "No project description available."}
                  </p>
                </div>

                <div
                  className="
                    mt-5 flex items-center
                    justify-between
                    border-t border-slate-100
                    pt-4
                    dark:border-slate-800
                  "
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="
                      inline-flex
                      items-center gap-1
                      text-sm font-medium
                      text-slate-700
                      transition
                      hover:text-slate-900
                      dark:text-slate-300
                      dark:hover:text-white
                    "
                  >
                    View Project
                    <ArrowRight size={15} />
                  </button>

                  {isOrgAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteProjectMutation.isPending}
                      aria-label={`Delete ${project.name}`}
                      title="Delete project"
                      className="
                        rounded-lg p-2
                        text-red-500
                        transition
                        hover:bg-red-50
                        dark:text-red-400
                        dark:hover:bg-red-950/30
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={page === 1 || isFetching}
                onClick={() => setPage((currentPage) => currentPage - 1)}
                className="
                  rounded-lg
                  border border-slate-300
                  bg-white px-4 py-2
                  text-sm text-slate-700
                  transition hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Previous
              </button>

              <span
                className="
                  px-3 text-sm
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page === totalPages || isFetching}
                onClick={() => setPage((currentPage) => currentPage + 1)}
                className="
                  rounded-lg
                  border border-slate-300
                  bg-white px-4 py-2
                  text-sm text-slate-700
                  transition hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default Projects;
