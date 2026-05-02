import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles/styles.module.css";
import { RESTAURANT_ROUTES } from "@/routes/RoutePaths";

function RestaurantList({
  list,
  title,
}: {
  title: string;
  list: RestaurantCard[];
}) {
  return (
    <div className={styles.list}>
      <h3>{title}</h3>
      <div className={styles.wrapper}>
        {list.map((restaurant) => (
          <Link
            href={RESTAURANT_ROUTES.DETAILS(restaurant.id)}
            key={restaurant.id}
          >
            <Image
              src={restaurant.banner}
              alt={`${restaurant.name} banner`}
              width={400}
              height={200}
            />
            <div className={styles.restaurantInfo}>
              <p>{restaurant.name}</p>
              <div>
                <small>{restaurant.cuisine} Cuisine</small>
                <small>{restaurant.relativeDistance}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
