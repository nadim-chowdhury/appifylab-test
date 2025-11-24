export const ActionButton = ({ icon: Icon, label, active }: any) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active ? "text-blue-500 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
