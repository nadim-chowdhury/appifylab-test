import { EventCard } from "./event-card";

export const EventsWidget = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Events</h3>
        <button className="text-sm text-blue-500 hover:underline">
          See all
        </button>
      </div>
      <EventCard
        title="No more terrorism no more cry"
        date={{ day: "10", month: "Jul" }}
        attendees={17}
        image="/assets/images/feed_event1.png"
      />
    </div>
  );
};
