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
  icon,
}: UloDineLink) {
  return (
    <div
      className={`${styles.ulodine_link} ${styles[type as string]} ${
        styles[color]
      } ${disabled ? styles.disabled : ""}`}
      style={style}
    >
      <Link href={path}>
        {label} {icon ?? null}
      </Link>
    </div>
  );
}

export default UloDineLink;
