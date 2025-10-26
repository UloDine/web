"use client";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import { RESTAURANT_MANAGEMENT_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles/index.module.css";
import { capitalizeWord } from "@/utils/helpers";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import UloDineModal from "../modal/UloDineModal";

function RestaurantSidebar() {
  const pathname = usePathname();
  const { restaurant } = useProfile();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  if (!restaurant) return null;
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
          <strong>{restaurant.business_name}</strong>
          <small>{capitalizeWord(restaurant.business_plan)}</small>
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
      <button className={styles.logout} onClick={() => setIsOpen(true)}>
        {RestaurantIcons.logout} <span>Log Out</span>
      </button>
      <UloDineModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Log out"
        actionButtonText="Yes, Logout"
        cancelButtonText="Cancel"
        onAction={logout}
        showActions={true}
      >
        <div>
          <p>Are you sure you want to logout?</p>
        </div>
      </UloDineModal>
    </nav>
  );
}

export default RestaurantSidebar;
