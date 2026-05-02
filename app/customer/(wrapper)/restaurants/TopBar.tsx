"use client";
import { BellIcon, ScanIcon } from "@/icons/customer";
import React, { useEffect } from "react";
import styles from "./styles/restaurants.module.css";
import UloDineSearch from "@/components/input/UloDineSearch";
import TabLayout from "../orders/TabLayout";

function TopBar({
  onTabChange,
  activeTab,
}: {
  onTabChange: (tab: string) => void;
  activeTab: string;
}) {
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

  return (
    <div className={styles.top_bar}>
      <div className={styles.inner}>
        <h2>Browse Restaurants</h2>
        <div className={styles.right}>
          <button>
            <ScanIcon />
          </button>
          <button>
            <BellIcon />
          </button>
        </div>
      </div>
      <UloDineSearch
        onSearchChange={() => {}}
        placeholder="Search for restaurants or meals…"
        type="normal"
        width={"100%"}
      />
      <TabLayout tabs={tabs} onTabChange={onTabChange} activeTab={activeTab} />
    </div>
  );
}

export default TopBar;
