"use client";
import { BellIcon, ScanIcon } from "@/icons/customer";
import React, { useEffect } from "react";
import styles from "./styles/restaurants.module.css";
import UloDineSearch from "@/components/input/UloDineSearch";
import TabLayout from "../orders/TabLayout";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES, CUSTOMER_ROUTES } from "@/routes/RoutePaths";
import { useAuth } from "@/context/AuthContext";
import UloDineLink from "@/components/button/UloDineLink";

function TopBar({
  onTabChange,
  activeTab,
  searchTerm,
  onSearchChange,
}: {
  onTabChange: (tab: string) => void;
  activeTab: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}) {
  const router = useRouter();
  const { getMe } = useAuth();
  const [user, setUser] = React.useState<MeResponsePayload | null>(null);
  const tabs = [
    { label: "Home", value: "home" },
    { label: "Local Dishes", value: "local-dishes" },
    { label: "Fast Food", value: "fast-food" },
    { label: "Healthy Choices", value: "healthy-choices" },
    { label: "Burgers & Sandwiches", value: "burgers-sandwiches" },
  ];

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className={styles.top_bar}>
      <div className={styles.inner}>
        <h2>Browse Restaurants</h2>
        <div className={styles.right}>
          <button onClick={() => router.push(CUSTOMER_ROUTES.SCAN)}>
            <ScanIcon />
          </button>
          {user ? (
            <button onClick={() => router.push(CUSTOMER_ROUTES.NOTIFICATIONS)}>
              <BellIcon />
              {/* {unread && <span />} */}
            </button>
          ) : (
            <UloDineLink
              path={AUTH_ROUTES.CUS_LOGIN}
              color="green"
              label="Login"
              type="main"
              underline={false}
              style={{ borderRadius: "5rem" }}
            />
          )}
        </div>
      </div>
      <UloDineSearch
        placeholder="Search for restaurants or meals…"
        value={searchTerm}
        onSearchChange={onSearchChange ?? (() => {})}
        type="normal"
        width={"100%"}
      />
      <TabLayout tabs={tabs} onTabChange={onTabChange} activeTab={activeTab} />
    </div>
  );
}

export default TopBar;
