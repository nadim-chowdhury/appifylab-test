import { Avatar } from "./avatar";

export const YouMightLike = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">You Might Like</h3>
        <button className="text-sm text-blue-500 hover:underline">
          See All
        </button>
      </div>
      <hr className="mb-4" />
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            src="/assets/images/Avatar.png"
            name="Radovan SkillArena"
            size="md"
          />
          <div>
            <h4 className="text-sm font-semibold">Radovan SkillArena</h4>
            <p className="text-xs text-gray-500">Founder & CEO at Trophy</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Ignore
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Follow
        </button>
      </div>
    </div>
  );
};
