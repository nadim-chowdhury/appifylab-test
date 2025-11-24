import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { ActionButton } from "./ection-button";

export const PostActions = () => {
  return (
    <div className="flex items-center justify-around border-t border-b border-gray-200 py-2 px-4">
      <ActionButton icon={ThumbsUp} label="Haha" active />
      <ActionButton icon={MessageCircle} label="Comment" />
      <ActionButton icon={Share2} label="Share" />
    </div>
  );
};
