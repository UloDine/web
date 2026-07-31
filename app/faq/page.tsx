"use client";

import React, { useState } from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./faq.module.css";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState<string>("");

  const allFaqs = [
    {
      category: "Getting Started",
      q: "How fast can my restaurant start using UloDine?",
      a: "You can sign up and start setting up your digital menu in less than 10 minutes. Your restaurant profile and QR codes generate automatically.",
    },
    {
      category: "Getting Started",
      q: "Do I need special hardware to run the Kitchen Display System?",
      a: "No. The Kitchen Display System runs in any web browser on Android tablets, iPads, laptops, or smart monitors.",
    },
    {
      category: "Orders & Table QR",
      q: "Do customers need to download an app to order?",
      a: "No app download is required. Diners simply point their smartphone camera at the table QR code to open your digital menu.",
    },
    {
      category: "Orders & Table QR",
      q: "Can diners call a waiter from their table?",
      a: "Yes. Every table QR menu includes a 'Call Waiter' button that triggers a real-time notification alert on your kitchen and dashboard management screens.",
    },
    {
      category: "Pricing & Payments",
      q: "Is there really 0% commission on orders?",
      a: "Yes. UloDine operates on a flat ₦5,000 monthly subscription model. We never charge percentage cuts or take commissions from your menu prices.",
    },
    {
      category: "Pricing & Payments",
      q: "How are customer online payments processed?",
      a: "Online card, transfer, and USSD payments are processed via Paystack directly into your registered bank account with daily automatic payouts.",
    },
  ];

  const filtered = allFaqs.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.faq_page}>
      <HeaderNavLayout />

      <section className={styles.hero_banner}>
        <h1>Help Center & FAQ</h1>
        <p>Find answers to common questions about onboarding, hardware, table ordering, and payouts.</p>

        <div className={styles.search_wrap}>
          {GeneralIcons.search}
          <input
            type="text"
            placeholder="Search questions or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className={styles.content_section}>
        <div className={styles.container}>
          <div className={styles.faq_list}>
            {filtered.map((item, idx) => (
              <div key={idx} className={styles.faq_card}>
                <button
                  className={styles.faq_btn}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className={styles.q_text}>
                    <span className={styles.cat_tag}>{item.category}</span>
                    {item.q}
                  </span>
                  <span className={styles.toggle_icon}>{openIdx === idx ? "−" : "+"}</span>
                </button>
                {openIdx === idx && <p className={styles.a_text}>{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
