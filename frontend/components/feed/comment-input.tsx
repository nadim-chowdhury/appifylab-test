import { Camera, Mic } from "lucide-react";
import { Avatar } from "./avatar";

export const CommentInput = () => {
  return (
    <div className="px-4 py-3 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <Avatar name="User" size="sm" />
        <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Write a comment"
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Mic className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
