"use client";

import React, { useState } from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(2000000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const traditionalFee = Math.round(monthlyRevenue * 0.3);
  const ulodineFee = 5000;
  const netSavings = traditionalFee - ulodineFee;

  const faqs = [
    {
      q: "Is there really 0% commission on orders?",
      a: "Yes, 100%. UloDine never takes a percentage cut of your sales or menu prices. You pay a flat ₦5,000 monthly subscription and keep 100% of your earnings.",
    },
    {
      q: "How does the 30-day free trial work?",
      a: "You get full access to all features — QR table ordering, kitchen display system, menu customizer, and waiter calls — for 30 days without any payment.",
    },
    {
      q: "Do my customers need to download an app?",
      a: "No. Diners simply scan the QR code on your table using their smartphone camera. The menu opens instantly in their browser.",
    },
    {
      q: "How are customer payments settled?",
      a: "All online payments are processed securely through Paystack directly into your registered bank account with instant settlement.",
    },
  ];

  return (
    <div className={styles.pricing_page}>
      <HeaderNavLayout />

      <section className={styles.hero_section}>
        <h1>Simple, Flat-Rate Pricing</h1>
        <p>No percentage cuts. No setup fees. 30-day free trial on all plans.</p>

        {/* 2-Column Pricing Cards Grid */}
        <div className={styles.pricing_grid}>
          {/* Standard Plan Card */}
          <div className={styles.pricing_card}>
            <span className={styles.badge}>STANDARD PLAN</span>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "0.5rem" }}>Single Venue</h3>
            <div className={styles.price_amount}>
              ₦5,000 <span>/ month</span>
            </div>
            <p className={styles.trial_note}>Perfect for independent local restaurants, cafes, and food trucks.</p>

            <div className={styles.feature_list}>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>0% Commission on all orders</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Unlimited Menu Items & Option Groups</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Kitchen Display System (KDS) & Audio Chimes</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Dine-In QR Code Table Management</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Waiter Call Alerts & Floor Plan</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Direct Paystack Daily Bank Settlement</span>
              </div>
            </div>

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

          {/* Growth Plan Card */}
          <div className={`${styles.pricing_card} ${styles.featured_plan}`}>
            <span className={`${styles.badge} ${styles.badge_growth}`}>GROWTH PLAN</span>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "0.5rem" }}>Multi-Branch & Enterprise</h3>
            <div className={styles.price_amount}>
              ₦12,000 <span>/ month</span>
            </div>
            <p className={styles.trial_note}>Built for growing restaurant groups, multi-location venues, and franchises.</p>

            <div className={styles.feature_list}>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Everything in Standard Plan</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Multi-Branch Location Management</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Advanced Sales & Revenue Analytics</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Staff User Access & Role Permissions</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Priority Onboarding & Phone Support</span>
              </div>
              <div className={styles.feat_item}>
                {GeneralIcons.check} <span>Custom Domain Integration</span>
              </div>
            </div>

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
      </section>

      {/* Interactive Savings Calculator */}
      <section className={styles.calc_section}>
        <div className={styles.calc_container}>
          <h2>Commission Savings Calculator</h2>
          <p>Drag the slider to see how much your restaurant saves compared to 30% delivery apps.</p>

          <div className={styles.slider_card}>
            <div className={styles.slider_header}>
              <span>Monthly Order Sales Volume:</span>
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

            <div className={styles.stats_grid}>
              <div className={styles.stat_box}>
                <label>30% Platform Fee</label>
                <span style={{ color: "#d80000" }}>-₦{traditionalFee.toLocaleString()}</span>
              </div>
              <div className={styles.stat_box}>
                <label>UloDine Flat Fee</label>
                <span>₦{ulodineFee.toLocaleString()}</span>
              </div>
              <div className={`${styles.stat_box} ${styles.highlight}`}>
                <label>Net Monthly Savings</label>
                <span style={{ color: "#00bb95" }}>+₦{netSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq_section}>
        <div className={styles.faq_container}>
          <h2>Frequently Asked Questions</h2>

          <div className={styles.faq_list}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faq_item}>
                <button
                  className={styles.faq_question}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className={styles.arrow}>{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && <p className={styles.faq_answer}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
