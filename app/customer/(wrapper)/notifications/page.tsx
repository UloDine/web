"use client";
import { ChevronLeftIcon, FilterIcon } from "@/icons/customer";
import React, { useState } from "react";
import TabLayout from "../orders/TabLayout";
import styles from "./styles/styles.module.css";
import { SEEDED_NOTIFICATIONS } from "./dummy";
import { DateUtils } from "@/utils/date";
import { useRouter } from "next/navigation";

function Notifications() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const data = SEEDED_NOTIFICATIONS.filter((notification) => {
    if (activeTab === "general") return notification.type === "GENERAL";
    if (activeTab === "orders") return notification.type === "ORDER_UPDATE";
    if (activeTab === "promotions") return notification.type === "PROMOTION";
    return true;
  });
  const tabs = [
    {
      label: "General",
      value: "general",
    },
    {
      label: "Orders",
      value: "orders",
    },
    {
      label: "Promotions",
      value: "promotions",
    },
  ];
  return (
    <section className={styles.notifications}>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.left}>
            <button onClick={() => router.back()}>
              <ChevronLeftIcon />
            </button>
            <h2>Notifications</h2>
          </div>
          <button className={styles.filter_btn}>
            <FilterIcon />
          </button>
        </div>
        <TabLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
      </div>
      <ul className={styles.body}>
        {data.map((notification) => (
          <li
            key={notification.id}
            className={!notification.read ? styles.unread : ""}
          >
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
            <small>
              {DateUtils.getRelativeTime(new Date(notification.createdAt))}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Notifications;
