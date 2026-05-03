"use client";
import React from "react";
import TopBar from "./TopBar";
import FeaturedRestaurants from "./FeaturedList";
import NearbyList from "./NearbyList";
import styles from "./styles/restaurants.module.css";
import { SEEDED_RESTAURANTS } from "../home/seed";
import RenderTab from "./RenderTab";
import { useSearchParams } from "next/navigation";

// Note: Metadata must be exported from server component. Create a layout file for static metadata.

function Browse() {
  const params = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(
    params?.get("tab") || "home",
  );
  return (
    <section className={styles.home}>
      <TopBar onTabChange={setActiveTab} activeTab={activeTab} />
      <div className={styles.content}>
        {activeTab === "home" ? (
          <>
            <FeaturedRestaurants list={SEEDED_RESTAURANTS.slice(0, 5)} />
            <NearbyList list={SEEDED_RESTAURANTS.slice(0, 5)} />
          </>
        ) : (
          <RenderTab />
        )}
      </div>
    </section>
  );
}

export default Browse;
