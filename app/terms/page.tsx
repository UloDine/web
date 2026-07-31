"use client";

import React from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";

export default function TermsPage() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <HeaderNavLayout />

      <section style={{ maxWidth: "900px", margin: "3rem auto", padding: "2.5rem", background: "#ffffff", borderRadius: "1rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem" }}>Terms & Conditions</h1>
        <p style={{ color: "#6b6a6a", fontSize: "0.95rem", marginBottom: "2rem" }}>
          Last updated: July 2026
        </p>

        <div style={{ color: "#171717", lineHeight: "1.7", fontSize: "1rem" }}>
          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>1. Service Plan & Subscription</h3>
          <p style={{ color: "#6b6a6a" }}>
            UloDine provides restaurant order management software on a flat monthly subscription of ₦5,000. Merchants enjoy 0% commission on orders. Subscription includes a 30-day free trial.
          </p>

          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>2. Merchant Responsibilities</h3>
          <p style={{ color: "#6b6a6a" }}>
            Restaurants are responsible for maintaining accurate menu pricing, availability, and fulfilling customer orders. UloDine provides the software platform for order transmission and kitchen display.
          </p>

          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>3. Cancellation & Termination</h3>
          <p style={{ color: "#6b6a6a" }}>
            Merchants may cancel their subscription at any time without penalty or cancellation fees.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
