import React from "react";
import styles from "../style/index.module.css";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <p className={styles.section_title}>{title}</p>
      <div className={styles.section_wrapper}>{children}</div>
    </section>
  );
}

export default Section;
