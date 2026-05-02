"use client";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

export const ProfileContext = createContext<Profile | null>(null);

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  function updateProfileStore(payload: { user: User; restaurant: Restaurant }) {
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload.user);
    setRestaurant(payload.restaurant);
  }

  useLayoutEffect(() => {
    const storedData = localStorage.getItem("user");
    const isProtectedRestaurantRoute = pathname?.startsWith(
      "/restaurant/management",
    );

    if (!storedData && isProtectedRestaurantRoute) {
      router.replace(AUTH_ROUTES.RES_LOGIN);
    }

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user ?? null);
      setRestaurant(parsedData.restaurant ?? null);
      return;
    }

    setUser(null);
    setRestaurant(null);
  }, [pathname, router]);

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
