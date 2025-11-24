import { Avatar } from "./avatar";

export const PostHeader = ({ author, timestamp, visibility, avatar }: any) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <Avatar src={avatar} name={author} size="md" />
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{author}</h4>
          <p className="text-xs text-gray-500">
            {timestamp} · <span className="text-blue-500">{visibility}</span>
          </p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
  );
};
