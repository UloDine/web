import React from "react";
import styles from "./styles/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import UloDIneButton from "@/components/button/UloDIneButton";

function EmptyScreen({
  subTitle,
  action,
  showButton,
  buttonLabel,
  icon,
  title,
  buttonColor,
}: EmptyScreen) {
  return (
    <div className={styles.empty_screen}>
      {icon ? icon : GeneralIcons.emptyScreen}
      <h2>{title ?? "There's Nothing to Show Here!"}</h2>
      <p className={styles.sub}>
        {subTitle ??
          "No record could be found at the moment. But don't worry, here will be populated as you create new records."}
      </p>
      {showButton && (
        <UloDIneButton
          color={buttonColor ?? "green"}
          label={buttonLabel as string}
          onClick={() => action?.()}
          type="primary"
        />
      )}
    </div>
  );
}

export default EmptyScreen;
