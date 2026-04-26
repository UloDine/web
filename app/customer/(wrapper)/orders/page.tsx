"use client";
import React, { useState } from "react";
import TabLayout from "./TabLayout";
import UloDineSearch from "@/components/input/UloDineSearch";
import ActiveOrders from "./ActiveOrders";
import styles from "./styles/styles.module.css";
import History from "./History";

function Orders() {
  const [activeTab, setActiveTab] = useState("active-orders");
  const tabs = [
    {
      label: "Active Order",
      value: "active-orders",
    },
    {
      label: "Order History",
      value: "order-history",
    },
  ];
  return (
    <section className={styles.orders}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <TabLayout
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
        <div className={styles.search}>
          <UloDineSearch
            onSearchChange={(value) => {}}
            placeholder="Search orders"
            type="normal"
          />
        </div>
      </div>
      {activeTab === "active-orders" ? <ActiveOrders /> : <History />}
    </section>
  );
}

export default Orders;
