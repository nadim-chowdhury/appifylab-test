"use client";

import { useState } from "react";
import { CommentInput } from "./comment-input";
import { CommentsList } from "./comments-list";
import { PostActions } from "./post-actions";
import { PostContent } from "./post-content";
import { PostStats } from "./post-details";
import { PostHeader } from "./post-header";
import { Post as PostType, useTogglePostLikeMutation } from "@/store/services/postsService";
import { useAuth } from "@/hooks/use-auth";

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();
  const [toggleLike] = useTogglePostLikeMutation();

  const isLiked = post.likes.some((like) => like.userId === user?.id);

  const handleLike = async () => {
    try {
      await toggleLike(post.id).unwrap();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const timeAgo = new Date(post.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <PostHeader
        author={`${post.user.firstName} ${post.user.lastName}`}
        timestamp={timeAgo}
        visibility={post.isPrivate ? "Private" : "Public"}
        avatar={null} // You might want to add avatar URL to user model or generate one
      />
      <PostContent
        text={post.content}
        image={post.imageUrl}
      />
      <PostStats likes={post._count.likes} comments={post._count.comments} shares={0} />
      <PostActions isLiked={isLiked} onLike={handleLike} onComment={() => setShowComments(!showComments)} />
      <CommentInput postId={post.id} />
      {showComments && <CommentsList postId={post.id} />}
      <button
        onClick={() => setShowComments(!showComments)}
        className="w-full py-2 text-sm text-gray-500 hover:bg-gray-50"
      >
        {showComments ? "Hide comments" : `View ${post._count.comments} comments`}
      </button>
    </div>
  );
};
