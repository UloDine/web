"use client";

import React from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import { FoodIllustrations } from "@/components/illustrations/illustrations";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./features.module.css";

export default function FeaturesPage() {
  return (
    <div className={styles.features_page}>
      <HeaderNavLayout />

      <section className={styles.hero_banner}>
        <h1>Everything Your Restaurant Needs</h1>
        <p>
          A unified order management system for dine-in, takeaway, and kitchen operations. Zero percentage cuts.
        </p>
      </section>

      {/* Feature 1: QR Table Ordering */}
      <section className={styles.feature_block}>
        <div className={styles.container}>
          <div className={styles.text_content}>
            <span className={styles.badge}>MODULE 1</span>
            <h2>Dine-In QR Code Table Ordering</h2>
            <p>
              Allow customers to scan table QR codes, browse your rich digital menu with photos, customize their selections, and place orders directly from their mobile browser.
            </p>
            <ul className={styles.check_list}>
              <li>{GeneralIcons.check} No mobile app installation required</li>
              <li>{GeneralIcons.check} Instant table number verification</li>
              <li>{GeneralIcons.check} Direct Paystack card, transfer, & USSD checkout</li>
            </ul>
          </div>
          <div className={styles.visual_content}>
            <FoodIllustrations.ScanQR />
          </div>
        </div>
      </section>

      {/* Feature 2: Kitchen Display System (KDS) */}
      <section className={`${styles.feature_block} ${styles.alt_bg}`}>
        <div className={styles.container}>
          <div className={styles.visual_content}>
            <FoodIllustrations.FoodBowl />
          </div>
          <div className={styles.text_content}>
            <span className={styles.badge}>MODULE 2</span>
            <h2>Kitchen Display System (KDS)</h2>
            <p>
              Replace lost paper tickets with a real-time 3-column kitchen screen. Instant audio chimes alert kitchen staff the moment an order is placed.
            </p>
            <ul className={styles.check_list}>
              <li>{GeneralIcons.check} 3-column prep tickets (New, In Prep, Ready)</li>
              <li>{GeneralIcons.check} Live ticket elapsed prep timers</li>
              <li>{GeneralIcons.check} Built-in Web Audio synthesizer chime sound</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature 3: Menu Customizer & Modifiers */}
      <section className={styles.feature_block}>
        <div className={styles.container}>
          <div className={styles.text_content}>
            <span className={styles.badge}>MODULE 3</span>
            <h2>Menu Modifiers & Add-On Customizer</h2>
            <p>
              Empower diners to customize their meals. Create optional and required option groups with single-choice radio buttons or multi-choice checkboxes.
            </p>
            <ul className={styles.check_list}>
              <li>{GeneralIcons.check} Required & optional option groups</li>
              <li>{GeneralIcons.check} Individual extra price adjustments per add-on</li>
              <li>{GeneralIcons.check} Automatic item total price calculations</li>
            </ul>
          </div>
          <div className={styles.visual_content}>
            <FoodIllustrations.Burger />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta_section}>
        <h2>Ready to Upgrade Your Restaurant Operations?</h2>
        <p>Start your 30-day free trial today. Flat ₦5,000/month afterwards.</p>
        <UloDIneButton
          type="primary"
          color="green"
          label="Start 30-Day Free Trial"
          onClick={() => {
            window.location.href = "http://localhost:5000/auth/signup";
          }}
        />
      </section>

      <Footer />
    </div>
  );
}
