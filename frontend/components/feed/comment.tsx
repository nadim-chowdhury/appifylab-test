import { Heart, ThumbsUp, Send } from "lucide-react";
import { Avatar } from "./avatar";
import { Comment as CommentType, useToggleCommentLikeMutation } from "@/store/services/commentsService";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useCreateReplyMutation, useToggleReplyLikeMutation } from "@/store/services/repliesService";

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  const { user } = useAuth();
  const [toggleLike] = useToggleCommentLikeMutation();
  const [toggleReplyLike] = useToggleReplyLikeMutation();
  const [createReply, { isLoading: isReplying }] = useCreateReplyMutation();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const isLiked = comment.likes.some((like) => like.userId === user?.id);

  const handleLike = async () => {
    try {
      await toggleLike(comment.id).unwrap();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleReplyLike = async (replyId: string) => {
    try {
      await toggleReplyLike(replyId).unwrap();
    } catch (error) {
      console.error("Failed to toggle reply like:", error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      await createReply({ commentId: comment.id, content: replyContent }).unwrap();
      setReplyContent("");
      setShowReplyInput(false);
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };

  const timeAgo = (dateString: string) => new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex space-x-3">
      <Avatar src={null} name={`${comment.user.firstName} ${comment.user.lastName}`} size="sm" />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-semibold text-gray-900 mb-1">{`${comment.user.firstName} ${comment.user.lastName}`}</h5>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <button onClick={handleLike} className={`hover:underline font-medium ${isLiked ? "text-blue-500" : ""}`}>Like</button>
          <button onClick={() => setShowReplyInput(!showReplyInput)} className="hover:underline font-medium">Reply</button>
          <button className="hover:underline font-medium">Share</button>
          <span>{timeAgo(comment.createdAt)}</span>
        </div>
        {comment._count.likes > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center">
              <ThumbsUp className="w-3 h-3 text-blue-500" />
              <Heart className="w-3 h-3 text-red-500 ml-1" />
            </div>
            <span className="text-xs text-gray-600">{comment._count.likes}</span>
          </div>
        )}

        {/* Reply Input */}
        {showReplyInput && (
          <form onSubmit={handleReplySubmit} className="mt-3 flex items-center space-x-2">
            <Avatar name={`${user?.firstName} ${user?.lastName}`} size="xs" />
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 bg-transparent focus:outline-none text-xs"
              />
              <button type="submit" disabled={isReplying} className="text-blue-500 hover:text-blue-600 ml-2">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}

        {/* Replies List */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
            {comment.replies.map((reply) => {
               const isReplyLiked = reply.likes.some((like) => like.userId === user?.id);
               return (
                <div key={reply.id} className="flex space-x-3">
                  <Avatar src={null} name={`${reply.user.firstName} ${reply.user.lastName}`} size="xs" />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <h5 className="text-xs font-semibold text-gray-900 mb-1">{`${reply.user.firstName} ${reply.user.lastName}`}</h5>
                      <p className="text-xs text-gray-700">{reply.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <button onClick={() => handleReplyLike(reply.id)} className={`hover:underline font-medium ${isReplyLiked ? "text-blue-500" : ""}`}>Like</button>
                      <button className="hover:underline font-medium">Reply</button>
                      <span>{timeAgo(reply.createdAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
