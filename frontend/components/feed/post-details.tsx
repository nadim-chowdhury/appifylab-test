export const PostStats = ({ likes, comments, shares }: any) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-1">
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
          <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white" />
          <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white" />
        </div>
        <span className="text-sm text-gray-600">{likes}+</span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>{comments} Comment</span>
        <span>{shares} Share</span>
      </div>
    </div>
  );
};
