"use client";
import { apiRoutes } from "@/lib/apiRoutes";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

export const ProfileContext = createContext<Profile | null>(null);

const STORAGE_USER_KEY = "user";
const RESTAURANT_ACCOUNT_TYPE: AccountType = "RESTAURANT";
const CUSTOMER_ACCOUNT_TYPE: AccountType = "CUSTOMER";

function getForcedRestaurantLoginPath() {
  // Set a cookie flag that persists across URL changes
  if (typeof document !== "undefined") {
    document.cookie = "forced-login=true; path=/; max-age=60";
  }
  return `${AUTH_ROUTES.RES_LOGIN}?forced=true`;
}

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  function updateProfileStore(payload: {
    user: User;
    restaurant: Restaurant;
    accountType?: AccountType;
  }) {
    localStorage.setItem(
      STORAGE_USER_KEY,
      JSON.stringify({ ...payload, accountType: RESTAURANT_ACCOUNT_TYPE }),
    );
    setUser(payload.user);
    setRestaurant(payload.restaurant);
  }

  async function refreshRestaurantProfile(restaurantId: string) {
    const response = await fetch(
      apiRoutes.restaurant.settings.fetch(restaurantId),
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      },
    );

    const json = await response.json();

    if (!response.ok || json.status !== "success" || !json.data) {
      throw new Error(json.message || "Failed to refresh restaurant profile");
    }

    const nextRestaurant = json.data as Restaurant;
    setRestaurant(nextRestaurant);

    try {
      const storedData = localStorage.getItem(STORAGE_USER_KEY);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        localStorage.setItem(
          STORAGE_USER_KEY,
          JSON.stringify({
            ...parsedData,
            user: parsedData.user ?? user,
            restaurant: nextRestaurant,
            accountType: RESTAURANT_ACCOUNT_TYPE,
          }),
        );
      } else if (user) {
        localStorage.setItem(
          STORAGE_USER_KEY,
          JSON.stringify({
            user,
            restaurant: nextRestaurant,
            accountType: RESTAURANT_ACCOUNT_TYPE,
          }),
        );
      }
    } catch {
      if (user) {
        localStorage.setItem(
          STORAGE_USER_KEY,
          JSON.stringify({
            user,
            restaurant: nextRestaurant,
            accountType: RESTAURANT_ACCOUNT_TYPE,
          }),
        );
      }
    }

    return nextRestaurant;
  }

  useLayoutEffect(() => {
    const storedData = localStorage.getItem(STORAGE_USER_KEY);
    const isProtectedRestaurantRoute = pathname?.startsWith(
      "/restaurant/management",
    );

    if (!storedData && isProtectedRestaurantRoute) {
      router.replace(getForcedRestaurantLoginPath());
      return;
    }

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const accountType = parsedData.accountType as AccountType | undefined;

      if (accountType === RESTAURANT_ACCOUNT_TYPE) {
        if (parsedData.user && parsedData.restaurant) {
          setUser(parsedData.user);
          setRestaurant(parsedData.restaurant);
        } else {
          setUser(
            parsedData.user ??
              (parsedData.id
                ? {
                    id: parsedData.id,
                    user_role: parsedData.role ?? "restaurant",
                    email: parsedData.email,
                  }
                : null),
          );

          setRestaurant(
            parsedData.restaurant ??
              (parsedData.id
                ? {
                    id: parsedData.id,
                    business_name: parsedData.fullName ?? "",
                    business_plan: parsedData.business_plan ?? "free",
                  }
                : null),
          );
        }

        return;
      }

      if (accountType === CUSTOMER_ACCOUNT_TYPE) {
        if (isProtectedRestaurantRoute) {
          router.replace(getForcedRestaurantLoginPath());
        }

        setUser(null);
        setRestaurant(null);
        return;
      }

      setUser(parsedData.user ?? null);
      setRestaurant(parsedData.restaurant ?? null);
      return;
    }

    setUser(null);
    setRestaurant(null);
  }, [pathname, router]);

  return (
    <ProfileContext.Provider
      value={{
        user,
        restaurant,
        setUser,
        setRestaurant,
        updateProfileStore,
        refreshRestaurantProfile,
      }}
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
