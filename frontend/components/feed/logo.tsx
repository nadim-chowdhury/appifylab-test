import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/assets/images/logo.svg"
        alt=""
        width={320}
        height={180}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
