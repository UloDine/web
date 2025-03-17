import React from "react";
import styles from "./style/index.module.css";

interface FormatMenuStatus {
  status: "Not Ready" | "Ready";
  stockStatus: "Available" | "Out of Stock";
}

function FormatStatus({ status, stockStatus }: FormatMenuStatus) {
  const combined = [status, stockStatus];
  return combined.map((item, index) => (
    <span
      key={index}
      className={`${styles.status} ${
        index == 0
          ? styles[status.toLowerCase().replace(" ", "")]
          : styles[stockStatus.toLowerCase().replaceAll(" ", "")]
      }`}
    >
      {item}
    </span>
  ));
}

export default FormatStatus;
