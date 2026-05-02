import { useSearchParams } from "next/navigation";
import React from "react";
import { SEEDED_RESTAURANTS } from "../home/seed";
import { RestaurantCard } from "@/components/cards";
import styles from "./styles/restaurants.module.css";

function RenderTab() {
  const params = useSearchParams();
  const tab = params.get("tab") || "home";
  function normalizeSlug(slug: string) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return (
    <div className={styles.render_tab}>
      <h3>{normalizeSlug(tab)}</h3>
      <div className={styles.tab_contents}>
        {SEEDED_RESTAURANTS.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RenderTab;
