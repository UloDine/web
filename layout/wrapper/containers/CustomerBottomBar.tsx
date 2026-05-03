"use client";

import {
  BrowseIcon,
  HomeIcon,
  OrdersIcon,
  ProfileIcon,
} from "@/icons/customer";
import { useAuth } from "@/context/AuthContext";
import { CUSTOMER_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles/index.module.css";

function CustomerBottomBar() {
  const pathname = usePathname();
  const { getMe } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchAuthState() {
      try {
        const authState = await getMe();
        if (isMounted) {
          setIsLoggedIn(Boolean(authState.loggedIn));
        }
      } catch {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    }

    fetchAuthState();

    return () => {
      isMounted = false;
    };
  }, [getMe]);

  const tabs: Array<{ path: string; label: string; icon: React.ReactNode }> = [
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
  ];

  if (isLoggedIn) {
    tabs.push(
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
    );
  }
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
