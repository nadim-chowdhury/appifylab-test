import { baseApi } from "./baseApi";

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  isPrivate: boolean;
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
    comments: number;
  };
  likes: {
    userId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
}

export interface CreatePostRequest {
  content: string;
  isPrivate?: boolean;
  imageUrl?: string;
}

export interface UpdatePostRequest {
  id: string;
  content?: string;
  isPrivate?: boolean;
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const postsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/posts",
        params: { page, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }, { type: "Post", id: "LIST" }],
    }),
    togglePostLike: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/likes/posts/${postId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, postId) => [{ type: "Post", postId }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useTogglePostLikeMutation,
} = postsService;
