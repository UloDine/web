"use client";
import React from "react";
import styles from "../styles/style.module.css";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import { useRouter } from "next/navigation";
import UloDineRadioButton from "@/components/input/UloDineRadioButton";

function Notifications() {
  const router = useRouter();
  const actions = [
    {
      label: "Light Mode",
      name: "theme",
      key: "light",
      action: () => {},
    },
    {
      label: "Dark Mode",
      name: "theme",
      key: "dark",
      action: () => {},
    },
    {
      label: "System Default",
      name: "theme",
      key: "system",
      action: () => {},
    },
  ];
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <h2>Theme</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.actions}>
          {actions.map((a, i) => (
            <div key={i} className={styles.action}>
              <p>{a.label}</p>
              <UloDineRadioButton onChange={(val) => {}} name={a.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Notifications;
