import React from "react";
import { Metadata, Viewport } from "next";
import TopBar from "./TopBar";
import styles from "./styles/home.module.css";
import Categories from "./Categories";
import { SEEDED_RESTAURANTS } from "./seed";
import FeaturedRestaurants from "./FeaturedList";
import NearbyList from "./NearbyList";

export const metadata: Metadata = {
  title: "Home | UloDine - Discover Local Restaurants & Order Food",
  description:
    "Welcome to UloDine. Browse featured restaurants, explore local dining options, and discover nearby eateries. Easy online food ordering from your favorite restaurants.",
  keywords: [
    "food delivery",
    "online restaurant ordering",
    "local restaurants",
    "food ordering app",
    "featured restaurants",
    "nearby restaurants",
  ],
  openGraph: {
    title: "Home | UloDine - Discover Local Restaurants & Order Food",
    description:
      "Browse featured restaurants, explore local dining options, and discover nearby eateries with UloDine.",
    url: "https://ulodine.com/customer/home",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-home.png",
        width: 1200,
        height: 630,
        alt: "UloDine Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | UloDine - Discover Local Restaurants & Order Food",
    description:
      "Browse featured restaurants, explore local dining options, and discover nearby eateries.",
    images: ["https://ulodine.com/og-home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/home",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
