import Image from "next/image";

export const StoryCard = ({ name, image, isOwn, hasStory, avatar }: any) => {
  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer group">
      <Image
        src={image}
        alt={name}
        width={320}
        height={180}
        className="w-full h-48 object-cover"
      />

      {hasStory && (
        <Image
          src={avatar}
          alt={name}
          width={320}
          height={180}
          className="w-8 h-8 object-cover rounded-full border-2 absolute top-2 right-2 z-10"
        />
      )}

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40" />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      {isOwn && (
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          +
        </button>
      )}
      <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium truncate">
        {name}
      </p>
    </div>
  );
};
