import { Calendar, FileText, Image, Video } from "lucide-react";
import { Avatar } from "./avatar";
import { PostActionButton } from "./post-action-button";

export const CreatePost = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-3 mb-4">
        <Avatar name="User" size="md" src="/assets/images/people1.png" />
        <div className="flex-1">
          <textarea
            placeholder="Write something..."
            className="w-full p-3 bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <PostActionButton icon={Image} label="Photo" />
          <PostActionButton icon={Video} label="Video" />
          <PostActionButton icon={Calendar} label="Event" />
          <PostActionButton icon={FileText} label="Article" />
        </div>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          Post
        </button>
      </div>
    </div>
  );
};
