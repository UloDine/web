import React, { ReactNode } from "react";
import styles from "./styles/index.module.css";

function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
}

export default Section;
