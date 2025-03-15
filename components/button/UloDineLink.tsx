import React from "react";
import styles from "@/styles/components/button/Button.module.css";
import Link from "next/link";

function UloDineLink({
  label,
  color,
  path,
  disabled,
  style,
  type,
}: UloDineLink) {
  return (
    <div
      className={`${styles.ulodine_link} ${styles[type]} ${
        disabled ? styles.disabled : ""
      }`}
      style={style}
    >
      <Link href={path}>{label}</Link>
    </div>
  );
}

export default UloDineLink;
