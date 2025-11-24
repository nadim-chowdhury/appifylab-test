import { Avatar } from "./avatar";

export const PersonCard = ({ name, role, avatar, showButton = true }: any) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar src={avatar} name={name} size="md" />
        <div>
          <h4 className="text-sm font-medium text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
      {showButton && (
        <button className="text-sm text-blue-500 font-medium border rounded px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-300">
          Connect
        </button>
      )}
    </div>
  );
};
