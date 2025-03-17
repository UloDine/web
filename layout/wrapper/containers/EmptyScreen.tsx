import React from "react";
import styles from "./styles/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";

function EmptyScreen({
  subTitle,
  action,
  button,
  buttonLabel,
  icon,
  title,
  buttonColor,
  buttonLabelColor,
}: EmptyScreen) {
  return (
    <div className={styles.empty_screen}>
      {GeneralIcons.emptyScreen}
      <h2>{title ?? "There's Nothing to Show Here!"}</h2>
      <p className={styles.sub}>
        {subTitle ??
          "No record could be found at the moment. But don't worry, here will be populated as you create new records."}
      </p>
    </div>
  );
}

export default EmptyScreen;
