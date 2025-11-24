import { Camera, Mic, Send } from "lucide-react";
import { Avatar } from "./avatar";
import { useState } from "react";
import { useCreateCommentMutation } from "@/store/services/commentsService";

interface CommentInputProps {
  postId: string;
}

export const CommentInput = ({ postId }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({ postId, content }).unwrap();
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <Avatar name="User" size="sm" />
        <form onSubmit={handleSubmit} className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment"
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          <div className="flex items-center space-x-2">
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <Mic className="w-4 h-4" />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <Camera className="w-4 h-4" />
            </button>
            <button type="submit" disabled={isLoading} className="text-blue-500 hover:text-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
