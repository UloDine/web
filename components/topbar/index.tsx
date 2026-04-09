"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import UloDineLink from "../button/UloDineLink";
import ToggleTheme from "../button/ToggleTheme";
import styles from "./styles/index.module.css";
import { useProfile } from "@/context/ProfileContext";
import { useCustomNavigation } from "@/context/NavigationContext";

function Topbar() {
  const { restaurant } = useProfile();
  const { setOpenSidebar } = useCustomNavigation();
  if (!restaurant) return null;
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {GeneralIcons.logo}
        <button onClick={() => setOpenSidebar(true)}>
          <span />
          <span />
          <span />
        </button>
      </div>
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
