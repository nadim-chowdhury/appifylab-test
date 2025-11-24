import { Comment } from "./comment";

export const CommentsList = () => {
  return (
    <div className="px-4 py-3 space-y-4">
      <Comment
        author="Radovan SkillArena"
        text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        likes={198}
        timestamp="21m"
      />
    </div>
  );
};
