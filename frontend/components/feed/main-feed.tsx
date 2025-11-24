"use client";

import { useGetPostsQuery } from "@/store/services/postsService";
import { CreatePost } from "./create-post";
import { Post } from "./post";
import { StoriesSection } from "./stories-section";
import { Loader2 } from "lucide-react";

export const MainFeed = () => {
  const { data: postsData, isLoading } = useGetPostsQuery({});

  return (
    <main className="col-span-6 space-y-4">
      <StoriesSection />
      <CreatePost />
      {isLoading ? (
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        postsData?.posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </main>
  );
};
