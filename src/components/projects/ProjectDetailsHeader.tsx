import {
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";

interface ProjectDetailsHeaderProps {
  projectName: string;
  description?: string | null;
  isOrgAdmin: boolean;
  isDeleting: boolean;
  onDelete: () => void;
}

const ProjectDetailsHeader = ({
  projectName,
  description,
  isOrgAdmin,
  isDeleting,
  onDelete,
}: ProjectDetailsHeaderProps) => {
  return (
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
            {projectName}
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
            {description ||
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
            onClick={onDelete}
            disabled={isDeleting}
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
  );
};

export default ProjectDetailsHeader;