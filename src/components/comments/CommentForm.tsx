import {
  Send,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  useCreateComment,
} from "../../hooks/useComments";

import {
  commentSchema,
  type CommentFormData,
} from "../../utils/validations/commentSchema";

interface CommentFormProps {
  taskId: string;
}

const CommentForm = ({
  taskId,
}: CommentFormProps) => {
  const createCommentMutation =
    useCreateComment();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CommentFormData>({
    resolver:
      zodResolver(commentSchema),

    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (
    data: CommentFormData
  ) => {
    try {
      await createCommentMutation.mutateAsync(
        {
          taskId,

          payload: {
            content: data.content,
          },
        }
      );

      reset();
    } catch (error) {
      console.error(
        "Failed to create comment:",
        error
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <textarea
        {...register("content")}
        rows={3}
        placeholder="Write a comment..."
        disabled={
          createCommentMutation.isPending
        }
        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 disabled:bg-slate-100"
      />

      {errors.content && (
        <p className="text-sm text-red-500">
          {errors.content.message}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            createCommentMutation.isPending
          }
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />

          {createCommentMutation.isPending
            ? "Posting..."
            : "Add Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;