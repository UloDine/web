"use client";

import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import styles from "./styles/home.module.css";
import Categories from "./Categories";
import FeaturedRestaurants from "./FeaturedList";
import NearbyList from "./NearbyList";
import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
import InPageLoader from "@/components/loaders/InPageLoader";
import { useGeoLocation } from "@/context/GeoLocationContext";
import Empty from "@/components/abstracts/Empty";

interface HomeRestaurantApiItem {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  address: string;
  banner: string;
  logo: string;
}

function formatDistance(distanceInKm: number | null) {
  if (distanceInKm === null || !Number.isFinite(distanceInKm)) {
    return "N/A";
  }

  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }

  return `${distanceInKm.toFixed(1)} km`;
}

function CustomerHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const { calculateDistanceToAddress } = useGeoLocation();

  // Build endpoint URL with query params
  const endpoint = (() => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    const queryString = params.toString();
    return queryString
      ? `${apiRoutes.restaurant.fetchAll}?${queryString}`
      : apiRoutes.restaurant.fetchAll;
  })();

  const { data: restaurants = [], loading } = useFetch<HomeRestaurantApiItem[]>(
    endpoint,
    [],
  );
  const [restaurantsWithDistance, setRestaurantsWithDistance] = useState<
    RestaurantCard[]
  >([]);
  const [isDistanceReady, setIsDistanceReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    const populateDistance = async () => {
      setIsDistanceReady(false);

      const enriched = await Promise.all(
        restaurants.map(async (restaurant) => {
          const distanceInKm = await calculateDistanceToAddress(
            restaurant.address,
          );

          return {
            id: restaurant.id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            rating: restaurant.rating,
            relativeDistance: formatDistance(distanceInKm),
            banner: restaurant.banner,
            logo: restaurant.logo,
          };
        }),
      );

      if (isActive) {
        setRestaurantsWithDistance(enriched);
        setIsDistanceReady(true);
      }
    };

    populateDistance();

    return () => {
      isActive = false;
    };
  }, [restaurants, calculateDistanceToAddress]);

  const homeList = restaurantsWithDistance.slice(0, 5);

  const renderSkeletonCard = (key: string) => (
    <article key={key} className={styles.skeletonCard} aria-hidden="true">
      <div className={styles.skeletonThumb} />
      <div className={styles.skeletonLogo} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLineLarge} />
        <div className={styles.skeletonLineMedium} />
        <div className={styles.skeletonLineSmall} />
      </div>
    </article>
  );

  const renderSkeletonSection = (titleWidthClass: string) => (
    <section className={styles.skeletonSection} aria-busy="true">
      <div className={styles.skeletonHeader}>
        <div className={`${styles.skeletonTitle} ${titleWidthClass}`} />
        <div className={styles.skeletonSubTitle} />
      </div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 5 }).map((_, index) =>
          renderSkeletonCard(`skeleton-card-${index}`),
        )}
      </div>
    </section>
  );

  if (loading) {
    return <InPageLoader text="Loading restaurants..." />;
  }

  return (
    <section className={styles.home}>
      <TopBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className={styles.content}>
        {!isDistanceReady ? (
          <>
            {renderSkeletonSection(styles.skeletonTitleWide)}
            <div className={styles.skeletonDivider} />
            {renderSkeletonSection(styles.skeletonTitleShort)}
          </>
        ) : homeList.length > 0 ? (
          <>
            <FeaturedRestaurants list={homeList} />
            <Categories />
            <NearbyList list={homeList} />
          </>
        ) : (
          <Empty
            icon="restaurant"
            title="No Restaurants Found"
            desc="Try adjusting your search or filter criteria."
          />
        )}
      </div>
    </section>
  );
}

export default CustomerHome;
