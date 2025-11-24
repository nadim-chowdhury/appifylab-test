import Image from "next/image";

export const PostContent = ({ title, image, text }: any) => {
  return (
    <div className="px-4">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {text && <p className="text-gray-700 mb-3">{text}</p>}
      {image && (
        <Image
          src={image}
          alt="Post content"
          width={320}
          height={180}
          className="w-full rounded-lg"
        />
      )}
    </div>
  );
};
