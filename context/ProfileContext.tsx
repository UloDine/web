"use client";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export const ProfileContext = createContext<Profile | null>(null);

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  function updateProfileStore(payload: { user: User; restaurant: Restaurant }) {
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload.user);
    setRestaurant(payload.restaurant);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (!storedData) {
      router.replace(AUTH_ROUTES.RES_LOGIN);
    }
    setUser(JSON.parse(storedData ?? "{}").user);
    setRestaurant(JSON.parse(storedData ?? "{}").restaurant);
  }, []);

  return (
    <ProfileContext.Provider
      value={{ user, restaurant, setUser, setRestaurant, updateProfileStore }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("Please use inside of ProfileProvider");
  return context;
}
