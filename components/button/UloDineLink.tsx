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
  underline = true,
  labelColor = "white",
}: UloDineLink) {
  return (
    <div
      className={`${styles.ulodine_link} ${styles[type as string]} ${
        styles[color]
      } ${disabled ? styles.disabled : ""}`}
      style={style}
    >
      <Link
        href={path}
        style={{
          textDecoration: underline ? "underline" : "none",
          color:
            labelColor === "green"
              ? "#00BB95"
              : labelColor === "green-light"
              ? "#E8FFFA"
              : labelColor === "grey"
              ? "#6B6A6A"
              : "#ffffff",
        }}
      >
        {label} {icon ?? null}
      </Link>
    </div>
  );
}

export default UloDineLink;
