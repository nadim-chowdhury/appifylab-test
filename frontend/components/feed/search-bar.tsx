import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchBar({ className }: any) {
  return (
    <div className={cn("flex-1 max-w-xl mx-8", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Input search text"
          className="w-full pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            paddingLeft: 40,
          }}
        />
      </div>
    </div>
  );
}
