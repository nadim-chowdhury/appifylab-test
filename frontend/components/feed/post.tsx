"use client";

import { useState } from "react";
import { CommentInput } from "./comment-input";
import { CommentsList } from "./comments-list";
import { PostActions } from "./post-actions";
import { PostContent } from "./post-content";
import { PostStats } from "./post-details";
import { PostHeader } from "./post-header";

export const Post = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <PostHeader
        author="Karim Saif"
        timestamp="5 minute ago"
        visibility="Public"
        avatar={null}
      />
      <PostContent
        title="-Healthy Tracking App"
        image="/api/placeholder/600/400"
      />
      <PostStats likes={9} comments={12} shares={122} />
      <PostActions />
      <CommentInput />
      {showComments && <CommentsList />}
      <button
        onClick={() => setShowComments(!showComments)}
        className="w-full py-2 text-sm text-gray-500 hover:bg-gray-50"
      >
        View 4 previous comments
      </button>
    </div>
  );
};
