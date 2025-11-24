import { HelpCircle, LogOut, Settings } from "lucide-react";
import { MenuItem } from "./menu-item";
import { ProfileHeader } from "./profile-header";

export const ProfileDropdown = () => {
  const menuItems = [
    {
      icon: Settings,
      label: "Settings",
      action: () => console.log("Settings"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      action: () => console.log("Help"),
    },
    { icon: LogOut, label: "Log Out", action: () => console.log("Logout") },
  ];

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4">
      <ProfileHeader
        name="Dylan Field"
        avatar="/assets/images/people1.png"
        onViewProfile={() => console.log("View Profile")}
      />

      <div className="pt-4 space-y-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
          />
        ))}
      </div>
    </div>
  );
};
