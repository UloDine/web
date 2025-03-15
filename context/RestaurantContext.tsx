"use client";
import { createContext, ReactNode, useState } from "react";

export const RestaurantContext = createContext<Restaurant | null>(null);

export default function RestaurantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    businessName: "Buka 9 Restaurant",
    email: "",
    id: "",
    plan: "free",
  });
  return (
    <RestaurantContext.Provider value={restaurant}>
      {children}
    </RestaurantContext.Provider>
  );
}
