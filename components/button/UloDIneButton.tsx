import React from "react";
import styles from "@/styles/components/button/Button.module.css";

function UloDIneButton({
  type,
  color,
  label,
  onClick,
  style,
  disabled = false,
  loading,
  labelColor,
}: Button) {
  return (
    <button
      disabled={disabled || loading}
      className={`${styles.button} ${styles[type]} ${styles[color]} ${
        styles[`label_${labelColor ?? ""}`]
      } ${disabled ? styles.disabled : loading ? styles.loading : ""}`}
      style={style}
      onClick={onClick}
    >
      {loading ? <span></span> : label}
    </button>
  );
}

export default UloDIneButton;
