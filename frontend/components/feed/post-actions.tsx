import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { ActionButton } from "./ection-button";

interface PostActionsProps {
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
}

export const PostActions = ({ isLiked, onLike, onComment }: PostActionsProps) => {
  return (
    <div className="flex items-center justify-around border-t border-b border-gray-200 py-2 px-4">
      <div onClick={onLike}>
        <ActionButton icon={ThumbsUp} label="Like" active={isLiked} />
      </div>
      <div onClick={onComment}>
        <ActionButton icon={MessageCircle} label="Comment" />
      </div>
      <ActionButton icon={Share2} label="Share" />
    </div>
  );
};
