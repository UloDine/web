import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// seed data removed; using live API
import { RestaurantCard } from "@/components/cards";
import styles from "./styles/restaurants.module.css";
import InPageLoader from "@/components/loaders/InPageLoader";
import { useGeoLocation } from "@/context/GeoLocationContext";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";
import Empty from "@/components/abstracts/Empty";

interface RestaurantApiItem {
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

function RenderTab({ searchTerm }: { searchTerm: string }) {
  const params = useSearchParams();
  const tab = params?.get("tab") || "home";
  function normalizeSlug(slug: string) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Build endpoint URL with query params
  const endpoint = (() => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    params.append("category", tab);
    const queryString = params.toString();
    return queryString
      ? `${apiRoutes.restaurant.fetchAll}?${queryString}`
      : apiRoutes.restaurant.fetchAll;
  })();
  const { calculateDistanceToAddress } = useGeoLocation();

  const { data: restaurants = [], loading } = useFetch<RestaurantApiItem[]>(
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

  const list = restaurantsWithDistance.slice(0, 5);

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

  const renderSkeletonSection = () => (
    <section className={styles.skeletonSection} aria-busy="true">
      {/* <div className={styles.skeletonHeader}>
        <div className={`${styles.skeletonTitle} ${titleWidthClass}`} />
        <div className={styles.skeletonSubTitle} />
      </div> */}
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
    <div className={styles.render_tab}>
      <h3>{normalizeSlug(tab)}</h3>
      {!isDistanceReady ? (
        <>
          {renderSkeletonSection()}
          <div className={styles.skeletonDivider} />
          {renderSkeletonSection()}
        </>
      ) : list.length > 0 ? (
        <div className={styles.tab_contents}>
          {list.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      ) : (
        <Empty
          icon="restaurant"
          title="No Restaurants Found"
          desc="Try adjusting your search or filter criteria."
          className={styles.empty_state}
        />
      )}
    </div>
  );
}

export default RenderTab;
