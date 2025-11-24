import { Bookmark, FileText, Gamepad2, Home, Settings, Users } from "lucide-react";
import { MenuItem } from "./menu-item";

export const ExploreMenu = () => {
  const menuItems = [
    { icon: Home, label: "Learning", badge: "New", active: false },
    { icon: Users, label: "Insights", active: false },
    { icon: Users, label: "Find friends", active: false },
    { icon: Bookmark, label: "Bookmarks", active: false },
    { icon: Users, label: "Group", active: false },
    { icon: Gamepad2, label: "Gaming", badge: "New", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: FileText, label: "Save post", active: false },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Explore</h3>
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </nav>
    </div>
  );
};
