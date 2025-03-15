import RestaurantProvider from "@/context/RestaurantContext";
import RestaurantLayout from "@/layout/wrapper/containers/RestaurantLayout";
import { ReactNode } from "react";

export default function RestaurantDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RestaurantProvider>
      <RestaurantLayout>{children}</RestaurantLayout>
    </RestaurantProvider>
  );
}
