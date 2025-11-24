import { baseApi } from "./baseApi";
import { Reply } from "./repliesService";

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  _count: {
    likes: number;
    replies: number;
  };
  likes: {
    userId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
  replies: Reply[];
  isLiked?: boolean;
}

export interface CreateCommentRequest {
  postId: string;
  content: string;
}

export const commentsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/comments/post/${postId}`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              { type: "Comment", id: `LIST-${postId}` },
            ]
          : [{ type: "Comment", id: `LIST-${postId}` }],
    }),
    createComment: builder.mutation<Comment, CreateCommentRequest>({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: `LIST-${postId}` },
        { type: "Post", id: postId }, // Invalidate post to update comment count
      ],
    }),
    toggleCommentLike: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/likes/comments/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, commentId) => [{ type: "Comment", id: commentId }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useToggleCommentLikeMutation,
} = commentsService;
