import { StarIcon } from "@/icons/customer";
import Image from "next/image";
import React from "react";
import styles from "./styles/styles.module.css";
import Link from "next/link";

function RestaurantCard({
  id,
  name,
  cuisine,
  rating,
  relativeDistance,
  banner,
  logo,
}: RestaurantCard) {
  return (
    <Link
      key={id}
      className={styles.restaurant_card}
      href={`/restaurants/${id}`}
    >
      <div className={styles.image_wrapper}>
        <Image
          src={banner}
          alt={`${name} banner`}
          width={400}
          height={200}
          className={styles.banner}
        />
        <Image
          src={logo}
          alt={`${name} logo`}
          width={80}
          height={80}
          className={styles.logo}
        />
      </div>
      <h4>{name}</h4>
      <p>{cuisine} Cuisine</p>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <StarIcon />
          <small>{rating}</small>
        </div>
        <small>{relativeDistance}</small>
      </div>
    </Link>
  );
}

export default RestaurantCard;
