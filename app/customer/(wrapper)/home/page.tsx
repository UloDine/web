import React from "react";
import TopBar from "./TopBar";
import styles from "./styles/home.module.css";
import Categories from "./Categories";
import { SEEDED_RESTAURANTS } from "./seed";
import FeaturedRestaurants from "./FeaturedList";
import NearbyList from "./NearbyList";

function CustomerHome() {
  return (
    <section className={styles.home}>
      <TopBar />
      <div className={styles.content}>
        <FeaturedRestaurants list={SEEDED_RESTAURANTS.slice(0, 5)} />
        <Categories />
        <NearbyList list={SEEDED_RESTAURANTS.slice(0, 5)} />
      </div>
    </section>
  );
}

export default CustomerHome;
