import { useGetCommentsQuery } from "@/store/services/commentsService";
import { Comment } from "./comment";
import { Loader2 } from "lucide-react";

interface CommentsListProps {
  postId: string;
}

export const CommentsList = ({ postId }: CommentsListProps) => {
  const { data: comments, isLoading } = useGetCommentsQuery(postId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-4">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
