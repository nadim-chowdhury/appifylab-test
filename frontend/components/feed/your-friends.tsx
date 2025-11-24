import { FriendItem } from "./friend-item";
import SearchBar from "./search-bar";

export const YourFriends = () => {
  const friends = [
    {
      name: "Steve Jobs",
      role: "CEO of Apple",
      online: false,
      lastSeen: "5 minute ago",
      avatar: "/assets/images/img10.png",
    },
    {
      name: "Ryan Roslansky",
      role: "CEO of Linkedin",
      online: true,
      avatar: "/assets/images/img11.png",
    },
    {
      name: "Dylan Field",
      role: "CEO of Figma",
      online: true,
      avatar: "/assets/images/img12.png",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Friends</h3>
        <button className="text-sm text-blue-500 hover:underline">
          See All
        </button>
      </div>
      <SearchBar className="w-full mx-0" />
      <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
        {friends.map((friend, index) => (
          <FriendItem key={index} {...friend} />
        ))}
      </div>
    </div>
  );
};
