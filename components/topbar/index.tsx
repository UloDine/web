"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import UloDineLink from "../button/UloDineLink";
import ToggleTheme from "../button/ToggleTheme";
import styles from "./styles/index.module.css";

function Topbar() {
  return (
    <header className={styles.header}>
      {GeneralIcons.logo}{" "}
      <div className={styles.right}>
        <UloDineLink
          color="green"
          label={"Get Premium"}
          path={""}
          type="main"
          underline={false}
        />

        <ToggleTheme />
        <button>{GeneralIcons.bell}</button>
      </div>
    </header>
  );
}

export default Topbar;
