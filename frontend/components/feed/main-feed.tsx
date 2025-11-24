import { CreatePost } from "./create-post";
import { Post } from "./post";
import { StoriesSection } from "./stories-section";

export const MainFeed = () => {
  return (
    <main className="col-span-6 space-y-4">
      <StoriesSection />
      <CreatePost />
      <Post />
      <Post />
    </main>
  );
};
