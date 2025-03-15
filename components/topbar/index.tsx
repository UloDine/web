"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useContext } from "react";
import UloDineLink from "../button/UloDineLink";
import ToggleTheme from "../button/ToggleTheme";
import styles from "./styles/index.module.css";
import { RestaurantContext } from "@/context/RestaurantContext";

function Topbar() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("Restaurant provider unavailable");
  }

  const { plan } = context;
  return (
    <header className={styles.header}>
      {GeneralIcons.logo}{" "}
      <div className={styles.right}>
        {plan !== "free" ? (
          <UloDineLink
            label={plan == "premium" ? "Get Enterprise" : "Get Premium"}
            path={""}
            type='primary'
          />
        ) : null}
        <ToggleTheme />
        <button>{GeneralIcons.bell}</button>
      </div>
    </header>
  );
}

export default Topbar;
