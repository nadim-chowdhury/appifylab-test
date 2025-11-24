import { YouMightLike } from "./you-might-like";
import { YourFriends } from "./your-friends";

export const RightSidebar = () => {
  return (
    <aside className="col-span-3">
      <div className="sticky top-20 space-y-4">
        <YouMightLike />
        <YourFriends />
      </div>
    </aside>
  );
};
