import { StoryCard } from "./story-card";

export const StoriesSection = () => {
  const stories = [
    {
      id: 1,
      name: "Your Story",
      image: "/assets/images/card_ppl1.png",
      avatar: "",
      isOwn: true,
    },
    {
      id: 2,
      name: "Ryan Roslansky",
      image: "/assets/images/card_ppl2.png",
      avatar: "/assets/images/img2.png",
      hasStory: true,
    },
    {
      id: 3,
      name: "Ryan Roslansky",
      image: "/assets/images/card_ppl3.png",
      avatar: "/assets/images/img5.png",
      hasStory: true,
    },
    {
      id: 4,
      name: "Ryan Roslansky",
      image: "/assets/images/card_ppl4.png",
      avatar: "/assets/images/img6.png",
      hasStory: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-4 gap-3">
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </div>
  );
};
