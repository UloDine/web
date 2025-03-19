import { AlertProvider } from "@/context/alert/AlertContext";
import { MenuProvider } from "@/context/menu/MenuContext";
import RestaurantProvider from "@/context/RestaurantContext";
import RestaurantLayout from "@/layout/wrapper/containers/RestaurantLayout";
import { ReactNode } from "react";

export default function RestaurantDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MenuProvider>
      <AlertProvider>
        <RestaurantProvider>
          <RestaurantLayout>{children}</RestaurantLayout>
        </RestaurantProvider>
      </AlertProvider>
    </MenuProvider>
  );
}
