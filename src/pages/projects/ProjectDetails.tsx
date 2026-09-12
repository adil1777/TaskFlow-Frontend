import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useProject,
  useDeleteProject,
} from "../../hooks/useProjects";

import { useAppSelector } from "../../redux/hooks";

import { ORG_ROLES } from "../../utils/types/role";

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const role = useAppSelector(
    (state) => state.organization.role
  );

  const [isDeleting, setIsDeleting] =
    useState(false);

  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useProject(projectId);

  const deleteProjectMutation =
    useDeleteProject();

  const isOrgAdmin =
    role === ORG_ROLES.ORG_ADMIN;

  const handleDelete = async () => {
    if (!projectId || !isOrgAdmin) {
      return;
    }

    if (deleteProjectMutation.isPending) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project?.name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

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
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 h-5 w-24 animate-pulse rounded bg-slate-200" />

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />

          <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Project not found
        </h2>

        <p className="mt-1 text-sm text-red-600">
          The project may have been deleted or you
          don't have access to it.
        </p>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/projects")
            }
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Projects
          </button>

          {isError && (
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  const createdDate = new Date(
    project.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const deleting =
    isDeleting ||
    deleteProjectMutation.isPending;

  return (
    <div>
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />

        Back to Projects
      </button>

      {/* Project Header */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-6 border-b border-slate-200 p-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Project Information */}
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <FolderKanban
                size={26}
                className="text-slate-700"
              />
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-2xl font-bold text-slate-900">
                {project.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {project.description ||
                  "No description available for this project."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil size={16} />

              Edit
            </button>

            {isOrgAdmin && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={16} />

                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            )}
          </div>
        </div>

        {/* Project Metadata */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Created */}
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <CalendarDays size={17} />

              <span className="text-sm">
                Created
              </span>
            </div>

            <p className="mt-2 font-medium text-slate-900">
              {createdDate}
            </p>
          </div>

          {/* Project ID */}
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Project ID
            </p>

            <p
              title={project.id}
              className="mt-2 truncate font-mono text-sm text-slate-900"
            >
              {project.id}
            </p>
          </div>

          {/* Organization */}
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Organization
            </p>

            <p
              title={project.organizationId}
              className="mt-2 truncate font-mono text-sm text-slate-900"
            >
              {project.organizationId}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tasks belonging to this project.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            + Add Task
          </button>
        </div>

        <div className="p-8 text-center">
          <p className="text-sm text-slate-500">
            No tasks available yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
