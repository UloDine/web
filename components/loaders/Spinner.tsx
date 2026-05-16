import React from "react";
import styles from "./style/Style.module.css";

function Spinner({
  size = 40,
  color = "#00c587",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      className={styles.spinner_small}
      style={{ "--size": size, "--color": color } as React.CSSProperties}
    />
  );
}

export default Spinner;
