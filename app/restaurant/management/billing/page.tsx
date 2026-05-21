"use client";

import React from "react";
import styles from "./style/index.module.css";
import PageTitleBar from "@/components/title";
import Overview from "./components/Overview";
import CollectionAccount from "./components/CollectionAccount";
import Transactions from "./components/Transactions";

function Billing() {
  return (
    <section className={styles.orders}>
      <PageTitleBar title="Billing & Subscription" />
      <section className={styles.payment_and_billing}>
        <Overview />
        <CollectionAccount />
        <Transactions />
      </section>
    </section>
  );
}

export default Billing;
