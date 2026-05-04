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

const STORAGE_USER_KEY = "user";
const RESTAURANT_ACCOUNT_TYPE: AccountType = "RESTAURANT";
const CUSTOMER_ACCOUNT_TYPE: AccountType = "CUSTOMER";

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

  useLayoutEffect(() => {
    const storedData = localStorage.getItem(STORAGE_USER_KEY);
    const isProtectedRestaurantRoute = pathname?.startsWith(
      "/restaurant/management",
    );
    if (!storedData && isProtectedRestaurantRoute) {
      router.replace(AUTH_ROUTES.RES_LOGIN);
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
          router.replace(AUTH_ROUTES.RES_LOGIN);
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
