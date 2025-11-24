import { Avatar } from "./avatar";

export default function UserProfile({ name, avatar, onClick }: any) {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer relative"
      onClick={onClick}
    >
      <Avatar src={avatar} name={name} size="sm" />
      <span className="text-sm font-medium text-gray-700">{name}</span>
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
