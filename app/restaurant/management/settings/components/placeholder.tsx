import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import styles from "../style/index.module.css";

export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={`${styles.imagePlaceholder} ${className || ""}`}>
      <div>{GeneralIcons.image_placeholder}</div>
    </div>
  );
}
