"use client";

import React from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import { FoodIllustrations } from "@/components/illustrations/illustrations";
import styles from "./about.module.css";

export default function AboutUsPage() {
  return (
    <div className={styles.about_page}>
      <HeaderNavLayout />

      <section className={styles.hero_banner}>
        <h1>Empowering Independent Restaurants</h1>
        <p>
          We build software that gives restaurant owners 100% control over their sales, menus, and operations without paying 30% commission cuts.
        </p>
      </section>

      <section className={styles.content_section}>
        <div className={styles.container}>
          <div className={styles.text_box}>
            <h2>Our Mission</h2>
            <p>
              Local restaurant owners work tirelessly to craft memorable dining experiences. Yet traditional delivery and ordering platforms consume up to 30% of gross order revenue, squeezing margins and stifling growth.
            </p>
            <p>
              UloDine was built to change that. By providing a direct 0% commission order management suite — including QR table ordering, kitchen display systems, and menu customization — we allow local food businesses to thrive on a flat, transparent ₦5,000 monthly plan.
            </p>
          </div>
          <div className={styles.visual_box}>
            <FoodIllustrations.FoodBowl />
          </div>
        </div>
      </section>

      <section className={styles.values_section}>
        <div className={styles.container_narrow}>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: "2.5rem" }}>
            Our Core Principles
          </h2>

          <div className={styles.values_grid}>
            <div className={styles.value_card}>
              <h3>0% Commission Philosophy</h3>
              <p>We will never charge percentage cuts on your hard-earned orders. You keep 100% of your earnings.</p>
            </div>

            <div className={styles.value_card}>
              <h3>Simplicity First</h3>
              <p>No app downloads required for diners, no complex hardware setups for kitchens. It works right out of the box.</p>
            </div>

            <div className={styles.value_card}>
              <h3>Direct Ownership</h3>
              <p>Your customer relationships and transaction data belong to you. Payments settle directly into your bank account.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
