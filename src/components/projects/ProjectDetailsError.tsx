import { ArrowLeft } from "lucide-react";

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
        The project may have been
        deleted or you don't have
        access to it.
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

export default ProjectDetailsError;