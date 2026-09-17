import api from "./axios";

import type {
  Comment,
  CommentsResponse,
  CreateCommentPayload,
} from "../utils/types/comment";

export const getTaskComments = async (
  taskId: string,
  page = 1,
  limit = 20
): Promise<CommentsResponse> => {
  const response = await api.get(
    `/tasks/${taskId}/comments`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};

export const createComment = async (
  taskId: string,
  payload: CreateCommentPayload
): Promise<Comment> => {
  const response = await api.post(
    `/tasks/${taskId}/comments`,
    payload
  );

  return response.data;
};

export const deleteComment = async (
  commentId: string
) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};