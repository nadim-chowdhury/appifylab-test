import { Avatar } from "./avatar";

export const FriendItem = ({ name, role, online, lastSeen, avatar }: any) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Avatar src={avatar} name={name} size="md" online={online} />
        <div>
          <h4 className="text-sm font-medium text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
      {!online && lastSeen && (
        <span className="text-xs text-gray-400">{lastSeen}</span>
      )}
    </div>
  );
};
