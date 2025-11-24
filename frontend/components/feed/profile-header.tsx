import Image from "next/image";

export const ProfileHeader = ({ name, avatar, onViewProfile }: any) => {
  return (
    <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
      <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={320}
            height={180}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-xl font-semibold">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <button
          onClick={onViewProfile}
          className="text-blue-500 text-sm hover:underline"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
