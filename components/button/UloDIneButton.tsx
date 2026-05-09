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
  className,
}: Button) {
  const classes = [
    styles.button,
    styles[type],
    styles[color],
    styles[
      disabled ? "disabled" : loading ? "loading" : `label_${labelColor ?? ""}`
    ],
    className,
  ].join(" ");
  return (
    <button
      disabled={disabled || loading}
      className={classes}
      style={style}
      onClick={onClick}
    >
      {loading ? (
        <span></span>
      ) : (
        [label, icon].map((item, index) =>
          item ? <div key={index}>{item}</div> : null,
        )
      )}
    </button>
  );
}

export default UloDIneButton;
