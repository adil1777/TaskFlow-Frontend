import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import { useTaskComments } from "../../hooks/useComments";

interface CommentSectionProps {
  taskId: string;
}

const CommentSection = ({ taskId }: CommentSectionProps) => {
  const { data, isLoading, isError, refetch } = useTaskComments(taskId);

  const comments = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section
      className="
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
          border-b
          border-slate-200
          px-6 py-5
          dark:border-slate-800
        "
      >
        <h2
          className="
            text-lg font-semibold
            text-slate-900
            dark:text-white
          "
        >
          Comments
        </h2>

        <p
          className="
            mt-1 text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Discuss this task with your team.
        </p>
      </div>

      {/* Content */}

      <div className="space-y-6 p-6">
        <CommentForm taskId={taskId} />

        <div
          className="
            border-t
            border-slate-100
            pt-6
            dark:border-slate-800
          "
        >
          {/* Loading */}

          {isLoading && (
            <div className="space-y-4" aria-label="Loading comments">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="
                      h-20
                      animate-pulse
                      rounded-xl
                      bg-slate-100
                      dark:bg-slate-800
                    "
                />
              ))}
            </div>
          )}

          {/* Error */}

          {isError && (
            <div
              className="
                rounded-lg
                border border-red-200
                bg-red-50 p-4
                dark:border-red-900/50
                dark:bg-red-950/30
              "
            >
              <p
                className="
                  text-sm
                  text-red-600
                  dark:text-red-400
                "
              >
                Failed to load comments.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="
                  mt-2
                  text-sm font-medium
                  text-red-700
                  underline
                  transition
                  hover:text-red-800
                  dark:text-red-400
                  dark:hover:text-red-300
                "
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}

          {!isLoading && !isError && comments.length === 0 && (
            <div className="py-8 text-center">
              <p
                className="
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
              >
                No comments yet.
              </p>

              <p
                className="
                    mt-1 text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
              >
                Be the first to comment on this task.
              </p>
            </div>
          )}

          {/* Comments */}

          {!isLoading && !isError && comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} canDelete />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
