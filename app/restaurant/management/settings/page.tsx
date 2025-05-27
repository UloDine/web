"use client";
import PageTitleBar from "@/components/title";
import React from "react";
import RenderTab from "./components/renderTab";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";

export default function Seetings() {
  const [currentTab, setCurrentTab] = React.useState<string>("general");

  const tabs: TabData[] = [
    {
      label: "General",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "general",
    },
    {
      label: "Account & Security",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "account-and-security",
    },
    {
      label: "Order & Menu Preferences",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "order-and-menu-preferences",
    },
    {
      label: "Payment & Billing",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "payment-and-billing",
    },
    {
      label: "Notifications & Alerts",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "notifications-and-alerts",
    },
    {
      label: "Support & Help",
      action: function () {
        setCurrentTab(this.value);
      },
      value: "support-and-help",
    },
  ];

  return (
    <section>
      <PageTitleBar title='Settings' />
      <div className={styles.settings}>
        <ul className={styles.tabs}>
          {tabs.map((tab) => (
            <li
              key={tab.value}
              onClick={() => tab.action.call(tab)}
              className={`${styles.tabItem} ${
                currentTab === tab.value ? styles.active : ""
              }`}
            >
              <p> {tab.label}</p>
              <span>{GeneralIcons.chevronRight}</span>
            </li>
          ))}
        </ul>
        <div className={styles.tabContent}>
          <RenderTab tab={currentTab} />
        </div>
      </div>
    </section>
  );
}
