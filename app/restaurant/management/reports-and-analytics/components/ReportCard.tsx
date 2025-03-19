import React from "react";
import styles from "./style/index.module.css";

function ReportCard({ icon, label, value }: ReportCard) {
  return (
    <div className={styles.report_card}>
      <h2>{value}</h2>
      <div>
        <span>{icon}</span> <p>{label}</p>
      </div>
    </div>
  );
}

export default ReportCard;
