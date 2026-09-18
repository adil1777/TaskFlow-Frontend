import { Trash2 } from "lucide-react";

import { useDeleteComment } from "../../hooks/useComments";

import type { Comment } from "../../utils/types/comment";

interface CommentItemProps {
  comment: Comment;
  canDelete: boolean;
}

const CommentItem = ({ comment, canDelete }: CommentItemProps) => {
  const deleteMutation = useDeleteComment();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        commentId: comment.id,
        taskId: comment.taskId,
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const initials = comment.user.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = new Date(comment.createdAt).toLocaleString();

  return (
    <article className="flex gap-3">
      {/* Avatar */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Comment */}
      <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {comment.user.name}
            </p>

            <time
              dateTime={comment.createdAt}
              className="text-xs text-slate-400 dark:text-slate-500"
            >
              {formattedDate}
            </time>
          </div>

          {/* Delete */}
          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              aria-label="Delete comment"
              title="Delete comment"
              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:focus:ring-red-900/50"
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Content */}
        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
          {comment.content}
        </p>
      </div>
    </article>
  );
};

export default CommentItem;
