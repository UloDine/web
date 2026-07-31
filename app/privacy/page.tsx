"use client";

import React from "react";
import HeaderNavLayout from "@/layout/pageNavbar";
import Footer from "@/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <HeaderNavLayout />

      <section style={{ maxWidth: "900px", margin: "3rem auto", padding: "2.5rem", background: "#ffffff", borderRadius: "1rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem" }}>Privacy Policy</h1>
        <p style={{ color: "#6b6a6a", fontSize: "0.95rem", marginBottom: "2rem" }}>
          Last updated: July 2026
        </p>

        <div style={{ color: "#171717", lineHeight: "1.7", fontSize: "1rem" }}>
          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>1. Information We Collect</h3>
          <p style={{ color: "#6b6a6a" }}>
            UloDine collects information required to process restaurant orders, manage merchant accounts, and process payments securely via Paystack. This includes restaurant business details, customer contact information, and order items.
          </p>

          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>2. How Information is Used</h3>
          <p style={{ color: "#6b6a6a" }}>
            We use collected data solely to deliver restaurant order management services, send transaction receipts, and enable kitchen ticket updates. We do not sell or monetize personal data to third parties.
          </p>

          <h3 style={{ fontSize: "1.3rem", margin: "1.5rem 0 0.5rem", color: "#00bb95" }}>3. Data Security & Payments</h3>
          <p style={{ color: "#6b6a6a" }}>
            All payment transactions are encrypted and processed by Paystack in compliance with PCI-DSS standards. UloDine does not store credit card numbers on its servers.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
