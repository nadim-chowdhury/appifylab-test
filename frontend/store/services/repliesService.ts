import { baseApi } from "./baseApi";

export interface Reply {
  id: string;
  content: string;
  commentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  likes: {
    userId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
  isLiked?: boolean;
}

export interface CreateReplyRequest {
  commentId: string;
  content: string;
}

export const repliesService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReply: builder.mutation<Reply, CreateReplyRequest>({
      query: (body) => ({
        url: "/replies",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId }, // Invalidate comment to update replies list if we were fetching individual comments, but we fetch by post.
        // We need to invalidate the LIST of comments for the post that this reply belongs to.
        // But we don't know the postId here easily without passing it.
        // However, `getComments` provides tags `LIST-${postId}`.
        // If we can't easily invalidate specific post's comments, we might need to invalidate all comments or pass postId.
        // For now, let's see if we can get away with invalidating "Comment".
        { type: "Comment" },
      ],
    }),
    toggleReplyLike: builder.mutation<void, string>({
      query: (replyId) => ({
        url: `/likes/replies/${replyId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, replyId) => [{ type: "Comment" }], // Invalidate comments to refresh replies likes
    }),
  }),
});

export const {
  useCreateReplyMutation,
  useToggleReplyLikeMutation,
} = repliesService;
