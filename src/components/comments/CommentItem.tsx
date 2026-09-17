import {
  Trash2,
} from "lucide-react";

import {
  useDeleteComment,
} from "../../hooks/useComments";

import type { Comment } from "../../utils/types/comment";

interface CommentItemProps {
  comment: Comment;
  canDelete: boolean;
}

const CommentItem = ({
  comment,
  canDelete,
}: CommentItemProps) => {
  const deleteMutation =
    useDeleteComment();

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
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
      console.error(
        "Failed to delete comment:",
        error
      );
    }
  };

  const initials =
    comment.user.name
      .split(" ")
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formattedDate =
    new Date(
      comment.createdAt
    ).toLocaleString();

  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
        {initials}
      </div>

      <div className="min-w-0 flex-1 rounded-xl bg-slate-50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {comment.user.name}
            </p>

            <p className="text-xs text-slate-400">
              {formattedDate}
            </p>
          </div>

          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={
                deleteMutation.isPending
              }
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-red-500 disabled:opacity-50"
              title="Delete comment"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>

        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;