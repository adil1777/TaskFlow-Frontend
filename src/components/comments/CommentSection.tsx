import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import {
  useTaskComments,
} from "../../hooks/useComments";

interface CommentSectionProps {
  taskId: string;
}

const CommentSection = ({
  taskId,
}: CommentSectionProps) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useTaskComments(taskId);

  const comments =
    data?.data ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Comments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Discuss this task with your team.
        </p>
      </div>

      <div className="space-y-6 p-6">
        <CommentForm taskId={taskId} />

        <div className="border-t border-slate-100 pt-6">
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-xl bg-slate-100"
                  />
                )
              )}
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">
                Failed to load comments.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 text-sm font-medium text-red-700 underline"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading &&
            !isError &&
            comments.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500">
                  No comments yet.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Be the first to comment on this task.
                </p>
              </div>
            )}

          {!isLoading &&
            !isError &&
            comments.length > 0 && (
              <div className="space-y-4">
                {comments.map(
                  (comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      canDelete
                    />
                  )
                )}
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;