import React from "react";
import styles from "@/styles/components/button/Button.module.css";

function UloDIneButton({
  type = "main",
  color,
  label,
  onClick,
  style,
  disabled = false,
  loading,
  labelColor = "white",
  icon,
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
      {loading ? (
        <span></span>
      ) : (
        [label, icon].map((item, index) =>
          item ? <div key={index}>{item}</div> : null
        )
      )}
    </button>
  );
}

export default UloDIneButton;
