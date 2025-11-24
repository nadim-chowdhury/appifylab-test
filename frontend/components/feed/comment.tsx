import { Heart, ThumbsUp } from "lucide-react";
import { Avatar } from "./avatar";

export const Comment = ({ author, text, likes, timestamp, avatar }: any) => {
  return (
    <div className="flex space-x-3">
      <Avatar src={avatar} name={author} size="sm" />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-semibold text-gray-900 mb-1">{author}</h5>
          <p className="text-sm text-gray-700">{text}</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <button className="hover:underline font-medium">Like</button>
          <button className="hover:underline font-medium">Reply</button>
          <button className="hover:underline font-medium">Share</button>
          <span>{timestamp}</span>
        </div>
        {likes > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center">
              <ThumbsUp className="w-3 h-3 text-blue-500" />
              <Heart className="w-3 h-3 text-red-500 ml-1" />
            </div>
            <span className="text-xs text-gray-600">{likes}</span>
          </div>
        )}
      </div>
    </div>
  );
};
