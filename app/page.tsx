"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import { FoodIllustrations } from "@/components/illustrations/illustrations";
import { GeneralIcons } from "@/icons/general/icons";

export default function Home() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1500000);

  const traditionalFee = Math.round(monthlyRevenue * 0.3);
  const ulodineFee = 5000;
  const netSavings = traditionalFee - ulodineFee;

  return (
    <div className={styles.landing_page}>
      <HeaderNavLayout />

      {/* Hero Section with Abstract Geometric Background */}
      <div className={styles.hero_wrapper}>
        <div className={styles.hero_abstract_bg}>
          <FoodIllustrations.HeroAbstractCurves />
        </div>

        <section className={styles.hero_section}>
          <div className={styles.hero_content}>
            <span className={styles.hero_badge_title}>
              0% Commission Order Management
            </span>

            <h1 className={styles.hero_title}>
              Keep <span>100% of Your Revenue</span>. Zero Commission Fees.
            </h1>

            <p className={styles.hero_desc}>
              Stop losing 30% of your earnings to third-party delivery apps. UloDine gives local restaurants direct QR table ordering, live kitchen display systems, and menu customization — all for one flat ₦5,000 monthly fee.
            </p>

            <div className={styles.hero_ctas}>
              <UloDIneButton
                type="primary"
                color="green"
                label="Start 30-Day Free Trial"
                className={styles.hero_main_btn}
                onClick={() => {
                  window.location.href = "http://localhost:5000/auth/signup";
                }}
              />
              <button
                className={styles.hero_main_btn}
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#171717",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => {
                  window.location.href = "http://localhost:3000/restaurants";
                }}
              >
                Explore Restaurants
              </button>
            </div>
          </div>

          <div className={styles.hero_illustration_wrap}>
            <FoodIllustrations.FoodBowl />

            {/* Floating Card 1: Bottom Left */}
            <div className={`${styles.stat_badge_card} ${styles.card_pos_1}`}>
              <div className={`${styles.icon_circle} ${styles.icon_green}`}>
                {GeneralIcons.check}
              </div>
              <div>
                <strong>₦0 Commission Cut</strong>
                <span>100% Direct Paystack Settlement</span>
              </div>
            </div>

            {/* Floating Card 2: Top Right */}
            <div className={`${styles.stat_badge_card} ${styles.card_pos_2}`}>
              <div className={`${styles.icon_circle} ${styles.icon_orange}`}>
                {GeneralIcons.orders}
              </div>
              <div>
                <strong>Live KDS Tickets</strong>
                <span>Instant Kitchen Chimes</span>
              </div>
            </div>

            {/* Floating Card 3: Top Left */}
            <div className={`${styles.stat_badge_card} ${styles.card_pos_3}`}>
              <div className={`${styles.icon_circle} ${styles.icon_blue}`}>
                {GeneralIcons.qr_code}
              </div>
              <div>
                <strong>Table QR Ordering</strong>
                <span>No App Download Needed</span>
              </div>
            </div>

            {/* Floating Card 4: Bottom Right */}
            <div className={`${styles.stat_badge_card} ${styles.card_pos_4}`}>
              <div className={`${styles.icon_circle} ${styles.icon_gold}`}>
                {GeneralIcons.check}
              </div>
              <div>
                <strong>5-Star Efficiency</strong>
                <span>Fast Table Turnaround</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive ROI Savings Calculator Section */}
      <section className={styles.calculator_section}>
        <div className={styles.calculator_container}>
          <h2 className={styles.section_title}>Calculate Your Monthly Savings</h2>
          <p className={styles.section_subtitle}>
            See how much more money your restaurant keeps when switching from 30% commission platforms to UloDine.
          </p>

          <div className={styles.slider_card}>
            <div className={styles.slider_head}>
              <span>Your Estimated Monthly Revenue:</span>
              <strong>₦{monthlyRevenue.toLocaleString()}</strong>
            </div>

            <input
              type="range"
              min="200000"
              max="10000000"
              step="100000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className={styles.range_input}
            />

            <div className={styles.comparison_grid}>
              <div className={`${styles.comp_card} ${styles.traditional}`}>
                <h4>30% Commission Apps</h4>
                <div className={styles.amount}>-₦{traditionalFee.toLocaleString()}</div>
                <small style={{ color: "#6b6a6a" }}>Lost in fees every month</small>
              </div>

              <div className={`${styles.comp_card} ${styles.ulodine}`}>
                <h4>UloDine Flat Plan</h4>
                <div className={styles.amount}>₦{ulodineFee.toLocaleString()}</div>
                <small style={{ color: "#6b6a6a" }}>Fixed monthly subscription</small>
              </div>

              <div className={`${styles.comp_card} ${styles.savings}`}>
                <h4>Your Monthly Savings</h4>
                <div className={styles.amount}>+₦{netSavings.toLocaleString()}</div>
                <small style={{ color: "#00bb95", fontWeight: 600 }}>Kept directly in your business!</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section with Left Illustration & Stacked Cards on Right */}
      <div className={styles.features_wrapper}>
        <div className={styles.features_abstract_bg}>
          <FoodIllustrations.HeroAbstractCurves />
        </div>

        <section className={styles.features_section}>
          <div className={styles.features_header}>
            <h2 className={styles.section_title}>Built Specifically for Local Restaurants</h2>
            <p className={styles.section_subtitle}>
              Everything you need to manage dine-in, takeaway, and kitchen workflow efficiently.
            </p>
          </div>

          <div className={styles.features_layout}>
            {/* Left Column: Food Illustration */}
            <div className={styles.features_illustration_col}>
              <FoodIllustrations.Burger style={{ width: "320px", height: "320px" }} />
            </div>

            {/* Right Column: Stacked Cards */}
            <div className={styles.features_stacked_col}>
              <div className={styles.feature_card}>
                <div className={styles.feature_icon}>{GeneralIcons.qr_code}</div>
                <div className={styles.feature_info}>
                  <h3>Dine-In QR Code Ordering</h3>
                  <p>
                    Diners scan table QR codes to browse your digital menu and order directly from their phone — no mobile app downloads required.
                  </p>
                </div>
              </div>

              <div className={styles.feature_card}>
                <div className={styles.feature_icon}>{GeneralIcons.orders}</div>
                <div className={styles.feature_info}>
                  <h3>Kitchen Display System (KDS)</h3>
                  <p>
                    Replace lost paper tickets with a live 3-column kitchen screen. Instant sound chimes alert your prep team when new orders arrive.
                  </p>
                </div>
              </div>

              <div className={styles.feature_card}>
                <div className={styles.feature_icon}>{GeneralIcons.edit}</div>
                <div className={styles.feature_info}>
                  <h3>Menu Modifiers & Customizer</h3>
                  <p>
                    Define optional and required item customizations — protein choices, spice levels, sides, and extra toppings with transparent add-on pricing.
                  </p>
                </div>
              </div>

              <div className={styles.feature_card}>
                <div className={styles.feature_icon}>{GeneralIcons.settings}</div>
                <div className={styles.feature_info}>
                  <h3>Floor Plan & Waiter Call System</h3>
                  <p>
                    Manage seating capacity and table availability in real time. Floating waiter call buttons on table menus alert staff instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section 1: For Restaurant Owners */}
      <div className={styles.section_wrapper}>
        <div className={styles.section_geo_bg}>
          <FoodIllustrations.StorefrontGeometricBg />
        </div>
        <section className={styles.owners_full_section}>
          <div className={styles.full_section_container}>
            <div className={styles.full_section_text}>
              <h2>Run a Highly Profitable Venue with 0% Commission</h2>
              <p>
                Stop losing 30% of your revenue to third-party delivery apps. UloDine provides local restaurants with direct QR table ordering, real-time Kitchen Display Systems, menu customizers, and instant Paystack settlements — all for a flat ₦5,000 monthly fee.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <UloDIneButton
                  type="primary"
                  color="green"
                  label="Start 30-Day Free Trial"
                  onClick={() => {
                    window.location.href = "http://localhost:5000/auth/signup";
                  }}
                  style={{ borderRadius: "5rem", height: "3.5rem", padding: "0 2.4rem" }}
                />
              </div>
            </div>

            <div className={styles.full_section_illustration}>
              <FoodIllustrations.Storefront style={{ width: "340px", height: "340px" }} />
            </div>
          </div>
        </section>
      </div>

      {/* Section 2: For Everyday Diners */}
      <div className={styles.section_wrapper}>
        <div className={styles.section_geo_bg}>
          <FoodIllustrations.DinerGeometricBg />
        </div>
        <section className={styles.diners_full_section}>
          <div className={styles.full_section_container}>
            <div className={styles.full_section_illustration}>
              <FoodIllustrations.ScanQR style={{ width: "320px", height: "320px" }} />
            </div>

            <div className={styles.full_section_text}>
              <h2>Dine Out & Order Direct in Seconds. Zero App Downloads.</h2>
              <p>
                Never wait around for paper menus or busy waiters again. Simply point your smartphone camera at any table QR code to browse rich digital menus with photos, customize your exact food options, request waiter service with one tap, and pay securely online.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#171717",
                    border: "none",
                    borderRadius: "5rem",
                    height: "3.5rem",
                    padding: "0 2.4rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    window.location.href = "/for-diners";
                  }}
                >
                  Explore Diner Experience
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Transparent Pricing Section - 2 Plans */}
      <section className={styles.pricing_section}>
        <div className={styles.pricing_container}>
          <h2 className={styles.section_title}>Simple, Honest Pricing</h2>
          <p className={styles.section_subtitle}>
            No hidden setup fees. No percentage cuts on your orders. 30-day free trial on all plans.
          </p>

          <div className={styles.pricing_grid}>
            {/* Standard Plan Card */}
            <div className={styles.pricing_card}>
              <span className={styles.plan_badge}>STANDARD PLAN</span>
              <h3>Single Venue</h3>
              <div className={styles.price_tag}>
                ₦5,000 <span>/ month</span>
              </div>
              <p style={{ color: "#6b6a6a", fontSize: "0.9rem" }}>
                Perfect for independent local restaurants, cafes, and food trucks.
              </p>

              <ul className={styles.pricing_features}>
                <li>{GeneralIcons.check} 0% Commission on all orders</li>
                <li>{GeneralIcons.check} Unlimited Menu Items & Option Groups</li>
                <li>{GeneralIcons.check} Unlimited Dine-in & Takeaway Orders</li>
                <li>{GeneralIcons.check} Kitchen Display System (KDS) & Audio Chimes</li>
                <li>{GeneralIcons.check} QR Code Table & Floor Management</li>
                <li>{GeneralIcons.check} Direct Paystack Payment Settlement</li>
              </ul>

              <div className={styles.pricing_cta_wrap}>
                <UloDIneButton
                  type="primary"
                  color="green"
                  label="Start 30-Day Free Trial"
                  onClick={() => {
                    window.location.href = "http://localhost:5000/auth/signup";
                  }}
                  style={{ width: "100%", height: "3.5rem", borderRadius: "5rem" }}
                />
              </div>
            </div>

            {/* Growth Plan Card */}
            <div className={`${styles.pricing_card} ${styles.featured_plan}`}>
              <span className={`${styles.plan_badge} ${styles.badge_growth}`}>GROWTH PLAN</span>
              <h3>Multi-Branch & Enterprise</h3>
              <div className={styles.price_tag}>
                ₦12,000 <span>/ month</span>
              </div>
              <p style={{ color: "#6b6a6a", fontSize: "0.9rem" }}>
                Built for growing restaurant groups, multi-location venues, and dining franchises.
              </p>

              <ul className={styles.pricing_features}>
                <li>{GeneralIcons.check} Everything in Standard Plan</li>
                <li>{GeneralIcons.check} Multi-Branch Location Management</li>
                <li>{GeneralIcons.check} Advanced Sales & Revenue Analytics</li>
                <li>{GeneralIcons.check} Staff User Access & Role Permissions</li>
                <li>{GeneralIcons.check} Priority Onboarding & Phone Support</li>
                <li>{GeneralIcons.check} Custom Domain Integration</li>
              </ul>

              <div className={styles.pricing_cta_wrap}>
                <UloDIneButton
                  type="primary"
                  color="green"
                  label="Start 30-Day Free Trial"
                  onClick={() => {
                    window.location.href = "http://localhost:5000/auth/signup";
                  }}
                  style={{ width: "100%", height: "3.5rem", borderRadius: "5rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
