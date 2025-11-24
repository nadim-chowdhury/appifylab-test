"use client";

import { useAuth } from "@/hooks/use-auth";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4">
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-muted-foreground">{user.email}</p>

      <button onClick={logout} className="btn-secondary mt-4">
        Logout
      </button>
    </div>
  );
}
