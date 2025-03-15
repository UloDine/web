"use client";
import { RestaurantContext } from "@/context/RestaurantContext";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import { RESTAURANT_MANAGEMENT_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import styles from "./styles/index.module.css";

function RestaurantSidebar() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("Restaurant has no provider");
  }

  const { businessName, plan } = context;

  const pathname = usePathname();
  const menu = [
    {
      icon: RestaurantIcons.overview,
      activeIcon: RestaurantIcons.overviewActive,
      label: "Overview",
      path: RESTAURANT_MANAGEMENT_ROUTES.OVERVIEW,
    },
    {
      icon: RestaurantIcons.orders,
      activeIcon: RestaurantIcons.ordersActive,
      label: "Orders",
      path: RESTAURANT_MANAGEMENT_ROUTES.ORDERS,
    },
    {
      icon: RestaurantIcons.menu,
      activeIcon: RestaurantIcons.menuActive,
      label: "Menu Management",
      path: RESTAURANT_MANAGEMENT_ROUTES.MENU_MANAGEMENT,
    },
    {
      icon: RestaurantIcons.report,
      activeIcon: RestaurantIcons.reportActive,
      label: "Reports & Analytics",
      path: RESTAURANT_MANAGEMENT_ROUTES.REPORTS,
    },
    {
      icon: RestaurantIcons.qr,
      activeIcon: RestaurantIcons.qrActive,
      label: "QR Code",
      path: RESTAURANT_MANAGEMENT_ROUTES.QR_CODE,
    },
    {
      icon: RestaurantIcons.settings,
      activeIcon: RestaurantIcons.settingsActive,
      label: "Settings",
      path: RESTAURANT_MANAGEMENT_ROUTES.SETTINGS,
    },
  ];
  return (
    <nav className={styles.side_bar}>
      <div className={styles.side_bar_header}>
        {RestaurantIcons.profilePlaceholder}
        <div className={styles.side_bar_header_right}>
          <strong>{businessName}</strong>
          <small>{plan.charAt(0).toUpperCase() + plan.slice(1)}</small>
        </div>
      </div>
      <ul>
        {menu.map((m, i) => (
          <li key={i}>
            <Link
              href={m.path}
              className={pathname == m.path ? styles.active : ""}
            >
              {pathname == m.path ? m.activeIcon : m.icon} {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RestaurantSidebar;
