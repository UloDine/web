"use client";

import {
  BrowseIcon,
  HomeIcon,
  OrdersIcon,
  ProfileIcon,
} from "@/icons/customer";
import { CUSTOMER_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles/index.module.css";

function CustomerBottomBar() {
  const pathname = usePathname();
  const tabs = [
    {
      path: CUSTOMER_ROUTES.HOME,
      label: "Home",
      icon: (
        <HomeIcon
          color={
            pathname === CUSTOMER_ROUTES.HOME
              ? "var(--color-primary)"
              : "var(--color-inactive-icon)"
          }
        />
      ),
    },
    {
      path: CUSTOMER_ROUTES.ORDERS,
      label: "Orders",
      icon: (
        <OrdersIcon
          color={
            pathname === CUSTOMER_ROUTES.ORDERS
              ? "var(--color-primary)"
              : "var(--color-inactive-icon)"
          }
        />
      ),
    },
    {
      path: CUSTOMER_ROUTES.BROWSE,
      label: "Browse",
      icon: (
        <BrowseIcon
          color={
            pathname === CUSTOMER_ROUTES.BROWSE
              ? "var(--color-primary)"
              : "var(--color-inactive-icon)"
          }
        />
      ),
    },
    {
      path: CUSTOMER_ROUTES.PROFILE,
      label: "Profile",
      icon: (
        <ProfileIcon
          color={
            pathname === CUSTOMER_ROUTES.PROFILE
              ? "var(--color-primary)"
              : "var(--color-inactive-icon)"
          }
        />
      ),
    },
  ];
  return (
    <nav className={styles.bottom_bar}>
      {tabs.map((tab) => (
        <Link href={tab.path} key={tab.path}>
          {tab.icon}
        </Link>
      ))}
    </nav>
  );
}

export default CustomerBottomBar;
