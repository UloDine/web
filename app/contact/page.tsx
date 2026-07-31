"use client";

import React, { useState } from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";
import UloDIneButton from "@/components/button/UloDIneButton";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.contact_page}>
      <HeaderNavLayout />

      <section className={styles.hero_banner}>
        <h1>Get in Touch</h1>
        <p>Have questions about onboarding your restaurant or multi-location setup? Our team is here to help.</p>
      </section>

      <section className={styles.content_section}>
        <div className={styles.container}>
          {/* Form Box */}
          <div className={styles.form_card}>
            <h2>Send Us a Message</h2>

            {submitted ? (
              <div className={styles.success_box}>
                <h3>Thank you! Your message has been sent.</h3>
                <p>Our sales and onboarding team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tunde Adeniyi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Work Email</label>
                  <input
                    type="email"
                    placeholder="tunde@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Restaurant / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos Kitchen & Lounge"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>How can we help you?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your restaurant setup or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <UloDIneButton
                  type="primary"
                  color="green"
                  label="Send Message"
                  onClick={() => {}}
                  style={{ width: "100%" }}
                />
              </form>
            )}
          </div>

          {/* Contact Details Box */}
          <div className={styles.details_card}>
            <h2>Direct Contact Info</h2>

            <div className={styles.detail_item}>
              <h4>Email Support</h4>
              <p>help@ulodine.com</p>
            </div>

            <div className={styles.detail_item}>
              <h4>Phone & WhatsApp</h4>
              <p>+234 906 321 3825</p>
            </div>

            <div className={styles.detail_item}>
              <h4>Office Location</h4>
              <p>Lagos, Nigeria</p>
            </div>

            <div className={styles.detail_item}>
              <h4>Merchant Support Hours</h4>
              <p>Monday – Saturday: 8:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
