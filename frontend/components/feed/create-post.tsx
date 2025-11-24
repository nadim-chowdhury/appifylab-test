import { Calendar, FileText, Image as ImageIcon, Video, Lock, Globe } from "lucide-react";
import { Avatar } from "./avatar";
import { PostActionButton } from "./post-action-button";
import { useState } from "react";
import { useCreatePostMutation } from "@/store/services/postsService";
import { useAuth } from "@/hooks/use-auth";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const { user } = useAuth();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      await createPost({
        content,
        isPrivate,
        imageUrl: imageUrl || undefined,
      }).unwrap();
      setContent("");
      setImageUrl("");
      setShowImageInput(false);
      setIsPrivate(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-3 mb-4">
        <Avatar name={`${user?.firstName} ${user?.lastName}`} size="md" src={null} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user?.firstName}?`}
            className="w-full p-3 bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          {showImageInput && (
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="w-full mt-2 p-2 border rounded text-sm"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div onClick={() => setShowImageInput(!showImageInput)}>
            <PostActionButton icon={ImageIcon} label="Photo" />
          </div>
          <PostActionButton icon={Video} label="Video" />
          <div onClick={() => setIsPrivate(!isPrivate)} className="cursor-pointer flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            {isPrivate ? <Lock className="w-5 h-5 text-red-500" /> : <Globe className="w-5 h-5 text-green-500" />}
            <span className="text-sm font-medium text-gray-600">{isPrivate ? "Private" : "Public"}</span>
          </div>
        </div>
        <button
          onClick={handlePost}
          disabled={isLoading || !content.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};
