"use client";
import { BellIcon, ScanIcon } from "@/icons/customer";
import { GeneralIcons } from "@/icons/general/icons";
import { DateUtils } from "@/utils/date";
import React from "react";
import styles from "./styles/home.module.css";
import UloDineSearch from "@/components/input/UloDineSearch";

function TopBar() {
  return (
    <div className={styles.top_bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {GeneralIcons.logo}
          <div>
            <small>{DateUtils.greetBasedOnTime(new Date())}</small>
            <strong>John Doe</strong>
          </div>
        </div>
        <div className={styles.right}>
          <button>
            <ScanIcon />
          </button>
          <button>
            <BellIcon />
          </button>
        </div>
      </div>
      <UloDineSearch
        onSearchChange={() => {}}
        placeholder="Search for restaurants or meals…"
        type="normal"
        width={"100%"}
      />
    </div>
  );
}

export default TopBar;
