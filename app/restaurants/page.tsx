"use client";

import React, { useEffect, useState } from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import InPageLoader from "@/components/loaders/InPageLoader";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./restaurants.module.css";
import Image from "next/image";

interface PublicRestaurant {
  id: string;
  name: string;
  banner?: string;
  description?: string;
  rating?: number;
  cuisine?: string;
  address?: string;
}

export default function PublicRestaurantsDiscovery() {
  const [restaurants, setRestaurants] = useState<PublicRestaurant[]>([]);
  const [filtered, setFiltered] = useState<PublicRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "African", "Fast Food", "Fine Dining", "Cafes & Drinks"];

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const res = await fetch("http://localhost:6000/api/restaurants");
        if (res.ok) {
          const json = await res.json();
          const list = json.data || json || [];
          setRestaurants(list);
          setFiltered(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRestaurants();
  }, []);

  useEffect(() => {
    let result = restaurants;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.cuisine?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((r) =>
        r.cuisine?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, selectedCategory, restaurants]);

  if (loading) {
    return <InPageLoader text="Loading restaurants directory..." />;
  }

  return (
    <div className={styles.discovery_page}>
      <HeaderNavLayout />

      <section className={styles.hero_banner}>
        <h1>Discover Local Restaurants</h1>
        <p>Explore top restaurants in your area, browse digital menus, and order direct.</p>

        {/* Search Bar */}
        <div className={styles.search_bar}>
          {GeneralIcons.search}
          <input
            type="text"
            placeholder="Search by restaurant name or cuisine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className={styles.content_section}>
        {/* Category Pills */}
        <div className={styles.categories_row}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.category_pill} ${
                selectedCategory === cat ? styles.active_pill : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Restaurants Grid */}
        <div className={styles.restaurants_grid}>
          {filtered.length === 0 ? (
            <div className={styles.empty_state}>
              <h3>No restaurants found</h3>
              <p>Try searching for a different name or category.</p>
            </div>
          ) : (
            filtered.map((restaurant) => (
              <div key={restaurant.id} className={styles.restaurant_card}>
                <div className={styles.image_wrap}>
                  {restaurant.banner ? (
                    <Image
                      src={restaurant.banner}
                      alt={restaurant.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={styles.placeholder_img}>
                      <span>{restaurant.name.charAt(0)}</span>
                    </div>
                  )}
                  {restaurant.rating && (
                    <div className={styles.rating_badge}>
                      ★ {restaurant.rating}
                    </div>
                  )}
                </div>

                <div className={styles.card_body}>
                  <h3>{restaurant.name}</h3>
                  <p className={styles.cuisine_tag}>
                    {restaurant.cuisine || "Local & International Cuisine"}
                  </p>
                  <p className={styles.description}>
                    {restaurant.description || "Enjoy fresh meals prepared with quality ingredients."}
                  </p>

                  <div className={styles.card_footer}>
                    <UloDIneButton
                      type="primary"
                      color="green"
                      label="View Menu & Order"
                      onClick={() => {
                        window.location.href = `/restaurants/${restaurant.id}`;
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
