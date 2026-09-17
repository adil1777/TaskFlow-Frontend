import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createComment,
  deleteComment,
  getTaskComments,
} from "../api/comment.api";

export const useTaskComments = (
  taskId: string,
  page = 1,
  limit = 20
) => {
  return useQuery({
    queryKey: [
      "task-comments",
      taskId,
      page,
      limit,
    ],

    queryFn: () =>
      getTaskComments(
        taskId,
        page,
        limit
      ),

    enabled: Boolean(taskId),

    staleTime: 30 * 1000,
  });
};

export const useCreateComment = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: {
        content: string;
      };
    }) =>
      createComment(
        taskId,
        payload
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "task-comments",
          variables.taskId,
        ],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      taskId,
    }: {
      commentId: string;
      taskId: string;
    }) =>
      deleteComment(commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "task-comments",
          variables.taskId,
        ],
      });
    },
  });
};