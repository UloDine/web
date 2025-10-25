"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import UloDineLink from "../button/UloDineLink";
import ToggleTheme from "../button/ToggleTheme";
import styles from "./styles/index.module.css";
import { useProfile } from "@/context/ProfileContext";

function Topbar() {
  const { restaurant } = useProfile();
  if (!restaurant) return null;
  return (
    <header className={styles.header}>
      {GeneralIcons.logo}{" "}
      <div className={styles.right}>
        {restaurant.business_plan === "free" ? (
          <UloDineLink
            color="green"
            label={"Get Premium"}
            path={""}
            type="main"
            underline={false}
          />
        ) : null}

        <ToggleTheme />
        <button>{GeneralIcons.bell}</button>
      </div>
    </header>
  );
}

export default Topbar;
