import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateComment } from "../../hooks/useComments";

import {
  commentSchema,
  type CommentFormData,
} from "../../utils/validations/commentSchema";

interface CommentFormProps {
  taskId: string;
}

const CommentForm = ({ taskId }: CommentFormProps) => {
  const createCommentMutation = useCreateComment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const isSubmitting = createCommentMutation.isPending;

  const onSubmit = async (data: CommentFormData) => {
    try {
      await createCommentMutation.mutateAsync({
        taskId,
        payload: {
          content: data.content,
        },
      });

      reset();
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Comment Input */}
      <div>
        <label
          htmlFor="comment-content"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Add a comment
        </label>

        <textarea
          id="comment-content"
          {...register("content")}
          rows={3}
          placeholder="Write a comment..."
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={
            errors.content ? "comment-content-error" : undefined
          }
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        />

        {errors.content && (
          <p
            id="comment-content-error"
            className="mt-1.5 text-sm text-red-500 dark:text-red-400"
          >
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
        >
          <Send size={16} aria-hidden="true" />

          {isSubmitting ? "Posting..." : "Add Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
