import React, { ReactNode } from "react";
import styles from "./styles/index.module.css";

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string | ReactNode;
}) {
  return (
    <div className={styles.sectionTitle}>
      <h2>{title}</h2>
      {subtitle && <h3>{subtitle}</h3>}
    </div>
  );
}

export default SectionTitle;
