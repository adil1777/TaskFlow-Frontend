import { Link } from "react-router-dom";

import { MoreHorizontal, UserRound } from "lucide-react";

import type { Project } from "../../utils/types/project";

interface ProjectCardProps {
  project: Project;
  organizationId: string;
  canManage: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectCard = ({
  project,
  organizationId,
  canManage,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            to={`/organizations/${organizationId}/projects/${project.id}`}
            className="line-clamp-1 text-base font-semibold text-slate-900 hover:text-indigo-600"
          >
            {project.name}
          </Link>

          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
            {project.description || "No project description."}
          </p>
        </div>

        {canManage && (
          <div className="relative">
            <details className="group/menu">
              <summary className="flex cursor-pointer list-none rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <MoreHorizontal size={18} />
              </summary>

              <div className="absolute right-0 top-10 z-20 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </details>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <UserRound size={14} />

          <span>
            {project.managerId ? "Project Manager assigned" : "No manager"}
          </span>
        </div>

        <Link
          to={`/organizations/${organizationId}/projects/${project.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Open
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
