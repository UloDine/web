"use client";

import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
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
import Empty from "@/components/abstracts/Empty";
import InPageLoader from "@/components/loaders/InPageLoader";

interface RestaurantPublicData {
  id: string;
  name: string;
  banner: string;
  email: string | null;
  phone: string | null;
  tagline?: string | null;
  description?: string | null;
  rating?: number | null;
  totalReviews?: number | null;
}

interface RestaurantMenusResponse {
  pagination: Record<string, unknown> | null;
  result: MenuData[];
}

function RestaurantDetails() {
  const router = useRouter();
  const params = useParams();
  const { addItem, totalItems } = useCart();
  const id = (params?.id as string) || "";
  const query = new URLSearchParams({
    restaurant_id: id,
  });
  const [selectedMenuItem, setSelectedMenuItem] =
    React.useState<MenuData | null>(null);
  const { data: restaurant, loading: restaurantLoading } =
    useFetch<RestaurantPublicData | null>(
      apiRoutes.restaurant.fetchPublicById(id),
      null,
    );

  const { data: menusData, loading: menusLoading } =
    useFetch<RestaurantMenusResponse>(apiRoutes.restaurant.menu.fetchAll(id), {
      pagination: null,
      result: [],
    });
  if (restaurantLoading) {
    return <InPageLoader text="Loading restaurant" />;
  }

  if (!restaurant) {
    return (
      <Empty
        icon="restaurant"
        title="Restaurant Not Found!"
        desc="We could not find the restaurant you're looking for. Maybe try adjusting your search term or filter category."
        className={styles.empty_state}
        action={() => router.push(CUSTOMER_ROUTES.BROWSE)}
        actionLabel="Back to Restaurants"
      />
    );
  }

  const restaurantData = restaurant;

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        {/* <Link href="/restaurants">Back to restaurants</Link> */}
        <h2>{restaurantData.name}</h2>
      </div>
      <div
        className={styles.hero}
        style={
          { "--bg": `url(${restaurantData.banner})` } as React.CSSProperties
        }
      >
        <div className={styles.top}>
          <div>
            {restaurantData.email && (
              <Link href={`mailto:${restaurantData.email}`}>
                <EmailIcon />
              </Link>
            )}
            {restaurantData.phone && (
              <Link href={`tel:${restaurantData.phone}`}>
                <PhoneIcon />
              </Link>
            )}
          </div>
          <button>
            <HeartIcon />
          </button>
        </div>
        <h1>{restaurantData.tagline ?? ""}</h1>
      </div>
      <div className={styles.meta}>
        <p>{restaurantData.description}</p>
        <div className={styles.wrapper}>
          <div>
            <RatingIcon />
            <small>{restaurantData.rating}</small>
          </div>
          <div>
            <ReviewIcon />
            <Link href={RESTAURANT_ROUTES.REVIEWS(restaurant.id)}>
              {restaurantData.totalReviews ?? 0} reviews
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.menu_container}>
        <h3>Menu</h3>
        <UloDineSearch
          type="normal"
          onSearchChange={() => {}}
          placeholder={`Search for meals in ${restaurantData.name}`}
          width={"100%"}
        />
        {/* <TabLayout tabs={["All", "Starters", "Main Course", "Desserts", "Beverages"]} onTabChange={(tab)=>{}}/> */}
        <div className={styles.menu_items}>
          {!menusLoading &&
          Array.isArray(menusData?.result) &&
          menusData.result.length > 0 ? (
            menusData.result.map((item) => (
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
                <b>{formatCurrency(parseFloat(String(item.price || 0)))}</b>
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
            ))
          ) : (
            <div>No menu items found.</div>
          )}
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
  );
}

export default RestaurantDetails;
