export const MenuItem = ({ icon: Icon, label, badge, active }: any) => {
  return (
    <button
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded">
          {badge}
        </span>
      )}
    </button>
  );
};
