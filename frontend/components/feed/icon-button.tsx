export default function IconButton({ icon: Icon, badge, active }: any) {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Icon
        className={`w-6 h-6 ${active ? "text-blue-500" : "text-gray-600"}`}
      />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
