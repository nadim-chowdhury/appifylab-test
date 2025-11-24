import Image from "next/image";

export const EventCard = ({ title, date, attendees, image }: any) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={320}
        height={180}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <div className="flex items-start space-x-3 mb-3">
          <div className="bg-green-500 rounded-lg p-2 text-center shadow-sm">
            <div className="text-xl font-bold text-white">{date.day}</div>
            <div className="text-xs text-white/80">{date.month}</div>
          </div>
          <h4 className="text-sm font-medium text-gray-900 flex-1">{title}</h4>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{attendees} People Going</span>
          <button className="text-blue-500 font-medium">Going</button>
        </div>
      </div>
    </div>
  );
};
