"use client";
import React from "react";
import styles from "../styles/style.module.css";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import { useRouter } from "next/navigation";

function Notifications() {
  const router = useRouter();
  const actions = [
    {
      label: "Enable Push Notification",
      action: () => {},
    },
    {
      label: "Receive Email Alert",
      action: () => {},
    },
  ];
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <h2>Notification Settings</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.actions}>
          {actions.map((a, i) => (
            <div key={i} className={styles.action}>
              <p>{a.label}</p>
              <UloDineCheckbox onChange={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Notifications;
