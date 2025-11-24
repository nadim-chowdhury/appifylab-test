import { PersonCard } from "./person-card";

export const SuggestedPeople = () => {
  const people = [
    { name: "Steve Jobs", role: "CEO of Apple", avatar: '/assets/images/people1.png' },
    { name: "Ryan Roslansky", role: "CEO of Linkedin", avatar: '/assets/images/people2.png' },
    { name: "Dylan Field", role: "CEO of Figma", avatar: '/assets/images/people3.png' },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Suggested People</h3>
        <button className="text-sm text-blue-500 hover:underline">
          See All
        </button>
      </div>
      <div className="space-y-3">
        {people.map((person, index) => (
          <PersonCard key={index} {...person} />
        ))}
      </div>
    </div>
  );
};
