import React from "react";
import styles from "./styles/home.module.css";
import { RestaurantsList } from "@/components/lists";

function NearbyList({ list }: { list: RestaurantCard[] }) {
  return (
    <div className={styles.nearbyList}>
      <RestaurantsList list={list} title="Nearby Restaurants" />
    </div>
  );
}

export default NearbyList;
