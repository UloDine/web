import React from "react";
import styles from "./style/Style.module.css";

interface InPageLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function InPageLoader({
  text = "Cooking up data...",
  size = "md",
}: InPageLoaderProps) {
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      <p className={styles.text}>{text} 🍳</p>
    </div>
  );
}
