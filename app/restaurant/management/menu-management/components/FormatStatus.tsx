import React from "react";
import styles from "./style/index.module.css";

interface FormatMenuStatus {
  status: string;
  stockStatus: string;
}

function FormatStatus({ status, stockStatus }: FormatMenuStatus) {
  const combined = [status, stockStatus];
  return combined.map((item, index) => (
    <span
      key={index}
      className={`${styles.status} ${
        index == 0
          ? styles[status !== null ? status.toLowerCase().replace(" ", "") : ""]
          : styles[
              stockStatus !== null
                ? stockStatus.toLowerCase().replaceAll(" ", "")
                : ""
            ]
      }`}
    >
      {item}
    </span>
  ));
}

export default FormatStatus;
