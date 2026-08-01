"use client";

import React from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import { FoodIllustrations } from "@/components/illustrations/illustrations";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./diners.module.css";

export default function ForDinersPage() {
  return (
    <div className={styles.diners_page}>
      <HeaderNavLayout />

      {/* Hero Banner for Diners */}
      <section className={styles.hero_section}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <span className={styles.tag_badge}>FOR EVERYDAY DINERS</span>
            <h1>Dine Better. Order Direct. Zero App Downloads.</h1>
            <p>
              Say goodbye to waiting for paper menus. Simply scan the QR code at
              your table to browse rich digital menus, customize your food, call
              your waiter, and pay securely — right from your browser.
            </p>
            <div className={styles.hero_ctas}>
              <UloDIneButton
                type="primary"
                color="green"
                label="Discover Nearby Restaurants"
                onClick={() => {
                  window.location.href = "/restaurants";
                }}
                style={{
                  height: "3.5rem",
                  borderRadius: "5rem",
                  padding: "0 2rem",
                }}
              />
            </div>
          </div>
          <div className={styles.hero_illustration}>
            <FoodIllustrations.ScanQR
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>
      </section>

      {/* Why Diners Love UloDine Grid */}
      <section className={styles.benefits_section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Why Diners Love Ordering with UloDine</h2>
            <p>Designed for speed, convenience, and effortless dining out.</p>
          </div>

          <div className={styles.benefits_grid}>
            <div className={styles.benefit_card}>
              <div className={styles.icon_box}>{GeneralIcons.qr_code}</div>
              <h3>No App Download Needed</h3>
              <p>
                Point your phone camera at the table QR code. Your digital menu
                opens instantly in your mobile browser without clogging your
                phone storage.
              </p>
            </div>

            <div className={styles.benefit_card}>
              <div className={styles.icon_box}>{GeneralIcons.edit}</div>
              <h3>Personalized Meal Customization</h3>
              <p>
                Choose your exact spice level, protein options, sides, and extra
                toppings with transparent add-on pricing before placing your
                order.
              </p>
            </div>

            <div className={styles.benefit_card}>
              <div className={styles.icon_box}>{GeneralIcons.settings}</div>
              <h3>1-Tap Waiter Call System</h3>
              <p>
                Need extra cutlery, water, or assistance? Tap the floating
                &apos;Call Waiter&apos; button on your mobile menu screen to
                alert staff instantly.
              </p>
            </div>

            <div className={styles.benefit_card}>
              <div className={styles.icon_box}>{GeneralIcons.check}</div>
              <h3>Fast & Secure Direct Payments</h3>
              <p>
                Pay securely via Paystack using debit card, instant bank
                transfer, or USSD code. Receive instant digital email receipts
                immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Diner Flow */}
      <section className={styles.steps_section}>
        <div className={styles.container}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.2rem",
              fontWeight: 700,
              marginBottom: "3rem",
            }}
          >
            How Dining Out Works
          </h2>

          <div className={styles.steps_grid}>
            <div className={styles.step_item}>
              <div className={styles.step_num}>1</div>
              <h4>Scan Table QR Code</h4>
              <p>
                Point your mobile phone camera at the QR code sticker placed on
                your dining table.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_num}>2</div>
              <h4>Browse & Customize Menu</h4>
              <p>
                Explore high-resolution food items, select options, and add
                items to your cart.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_num}>3</div>
              <h4>Pay & Enjoy Meal</h4>
              <p>
                Checkout securely online or pay via cash/POS at your table. Your
                order streams live to the kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
