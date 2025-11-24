import { EventsWidget } from "./events-widget";
import { ExploreMenu } from "./explore-menu";
import { SuggestedPeople } from "./suggested-people";

export const Sidebar = () => {
  return (
    <aside className="col-span-3">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
        <ExploreMenu />
        <SuggestedPeople />
        <EventsWidget />
      </div>
    </aside>
  );
};
