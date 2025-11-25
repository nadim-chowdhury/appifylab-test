"use client";

import { Bell, Home, MessageCircle, Users } from "lucide-react";
import IconButton from "./icon-button";
import UserProfile from "./user-profile";
import { useState } from "react";
import { ProfileDropdown } from "./profile-dropdown";
import { useAuth } from "@/hooks/use-auth";

export default function HeaderActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout, user } = useAuth();

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <IconButton icon={Home} active />
        <IconButton icon={Users} />
        <IconButton icon={Bell} badge={6} />
        <IconButton icon={MessageCircle} badge={2} />
        <UserProfile
          // name="Dylan Field"
          name={user ? `${user.firstName} ${user.lastName}` : "Dylan Field"}
          avatar="/assets/images/people1.png"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {isModalOpen && (
        <div className="absolute top-14 right-0">
          <ProfileDropdown />
        </div>
      )}
    </div>
  );
}
