"use client";
import React from "react";
import TopBar from "./TopBar";
import FeaturedRestaurants from "./FeaturedList";
import NearbyList from "./NearbyList";
import styles from "./styles/restaurants.module.css";
import RenderTab from "./RenderTab";
import { useSearchParams } from "next/navigation";

// Note: Metadata must be exported from server component. Create a layout file for static metadata.

function Browse() {
  const params = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(
    params?.get("tab") || "home",
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <section className={styles.home}>
      <TopBar
        onTabChange={setActiveTab}
        activeTab={activeTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className={styles.content}>
        {activeTab === "home" ? (
          <>
            <FeaturedRestaurants searchTerm={searchTerm} />
            <NearbyList searchTerm={searchTerm} />
          </>
        ) : (
          <RenderTab searchTerm={searchTerm} />
        )}
      </div>
    </section>
  );
}

export default Browse;
