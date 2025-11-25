"use client";

import { HelpCircle, LogOut, Settings } from "lucide-react";
import { MenuItem } from "./menu-item";
import { ProfileHeader } from "./profile-header";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export const ProfileDropdown = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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
    { icon: LogOut, label: "Log Out", action: () => handleLogout() },
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="w-80 bg-white rounded-lg shadow-lg p-4"
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <ProfileHeader
          name={user ? `${user.firstName} ${user.lastName}` : "User"}
          avatar="/assets/images/people1.png"
          onViewProfile={() => console.log("View Profile")}
        />
      </motion.div>

      <div className="pt-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MenuItem
              icon={item.icon}
              label={item.label}
              onClick={item.action}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
