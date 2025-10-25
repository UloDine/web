import React from "react";
import styles from "./style/index.module.css";

interface FormatStatusProps {
  status: "Pending" | "In Progress" | "Canceled" | "Ready";
}

function FormatStatus({ status }: FormatStatusProps) {
  return (
    <span
      className={`${styles.status} ${
        styles[status.toLowerCase().replace(" ", "")]
      }`}
    >
      {status}
    </span>
  );
}

export default FormatStatus;
