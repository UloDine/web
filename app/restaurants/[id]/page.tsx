"use client";

import {
  SEEDED_MENU_ITEMS,
  SEEDED_RESTAURANTS_WITH_FULL_DETAILS,
} from "@/app/customer/(wrapper)/home/seed";
import styles from "./styles/style.module.css";
import UloDineSearch from "@/components/input/UloDineSearch";
import { CUSTOMER_ROUTES, RESTAURANT_ROUTES } from "@/routes/RoutePaths";
import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  CartIcon,
  EmailIcon,
  HeartIcon,
  PhoneIcon,
  RatingIcon,
  ReviewIcon,
} from "@/icons/customer";
import MenuDetails from "./MenuDetails";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

function RestaurantDetails() {
  const router = useRouter();
  const params = useParams();
  const { addItem, totalItems } = useCart();
  const id = params.id as string;
  const query = new URLSearchParams({
    restaurant_id: id,
  });
  const [selectedMenuItem, setSelectedMenuItem] =
    React.useState<MenuData | null>(null);
  const restaurant = SEEDED_RESTAURANTS_WITH_FULL_DETAILS.find(
    (r) => r.id === id,
  );
  return restaurant ? (
    <section className={styles.details}>
      <div className={styles.header}>
        {/* <Link href="/restaurants">Back to restaurants</Link> */}
        <h2>{restaurant.name}</h2>
      </div>
      <div
        className={styles.hero}
        style={{ "--bg": `url(${restaurant.banner})` } as React.CSSProperties}
      >
        <div className={styles.top}>
          <div>
            <Link href={`mailto:${restaurant.email}`}>
              <EmailIcon />
            </Link>
            <Link href={`tel:${restaurant.phone}`}>
              <PhoneIcon />
            </Link>
          </div>
          <button>
            <HeartIcon />
          </button>
        </div>
        <h1>{restaurant.tagline}</h1>
      </div>
      <div className={styles.meta}>
        <p>{restaurant.description}</p>
        <div className={styles.wrapper}>
          <div>
            <RatingIcon />
            <small>{restaurant.rating}</small>
          </div>
          <div>
            <ReviewIcon />
            <Link href={RESTAURANT_ROUTES.REVIEWS(restaurant.id)}>
              {restaurant.totalReviews} reviews
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.menu_container}>
        <h3>Menu</h3>
        <UloDineSearch
          type="normal"
          onSearchChange={(val) => {}}
          placeholder={`Search for meals in ${restaurant.name}`}
          width={"100%"}
        />
        {/* <TabLayout tabs={["All", "Starters", "Main Course", "Desserts", "Beverages"]} onTabChange={(tab)=>{}}/> */}
        <div className={styles.menu_items}>
          {SEEDED_MENU_ITEMS.filter((item) => item.restaurant_id === id)
            .slice(0, 10)
            .map((item) => (
              <div
                key={item.id}
                className={styles.menu_item}
                onClick={() => setSelectedMenuItem(item)}
              >
                <Image
                  src={item.menu_image}
                  alt={item.item_name}
                  width={200}
                  height={200}
                />
                <h4>{item.item_name}</h4>
                <b>{formatCurrency(parseFloat(item.price))}</b>
                <div className={styles.row}>
                  <span
                    className={item.prep_status === "Ready" ? styles.ready : ""}
                  >
                    {item.prep_status}
                  </span>
                  <span
                    className={
                      item.stock_status === "Available" ? styles.available : ""
                    }
                  >
                    {item.stock_status}
                  </span>
                </div>
                <div className={styles.btn}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(id, item, 1);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        className={styles.cart_btn}
        onClick={() => router.push(`${CUSTOMER_ROUTES.CART}?${query}`)}
      >
        {totalItems > 0 && <span>{totalItems}</span>}
        <CartIcon />
      </button>
      {selectedMenuItem && (
        <MenuDetails
          {...selectedMenuItem}
          setSelectedMenu={setSelectedMenuItem}
        />
      )}
    </section>
  ) : (
    <></>
  );
}

export default RestaurantDetails;
