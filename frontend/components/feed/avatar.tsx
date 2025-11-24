import Image from "next/image";

export const Avatar = ({ src, name, size = "md", online }: any) => {
  const sizeClasses: any = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gray-200 overflow-hidden`}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={320}
            height={180}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium">
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};
