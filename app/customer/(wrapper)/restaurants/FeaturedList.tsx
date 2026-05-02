import React from "react";
import styles from "./styles/restaurants.module.css";
import { RestaurantCard } from "@/components/cards";

function FeaturedRestaurants({ list }: { list: RestaurantCard[] }) {
  return (
    <div className={styles.recentList}>
      <h3>Featured Restaurants</h3>
      <div className={styles.horizontal}>
        {list.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedRestaurants;
