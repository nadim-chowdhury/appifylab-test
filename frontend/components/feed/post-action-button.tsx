export const PostActionButton = ({ icon: Icon, label }: any) => {
  return (
    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
