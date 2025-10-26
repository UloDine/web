"use client";
import { AlertProvider } from "@/context/alert/AlertContext";
import { MenuProvider } from "@/context/menu/MenuContext";
// import { useAuthGuard } from "@/hooks/useAuthGuard";
import RestaurantLayout from "@/layout/wrapper/containers/RestaurantLayout";
import { ReactNode } from "react";

export default function RestaurantDashboard({
  children,
}: {
  children: ReactNode;
}) {
  // useAuthGuard();
  return (
    <MenuProvider>
      <AlertProvider>
        <RestaurantLayout>{children}</RestaurantLayout>
      </AlertProvider>
    </MenuProvider>
  );
}
