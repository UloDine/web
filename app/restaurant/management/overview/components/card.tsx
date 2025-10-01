import UloDineLink from "@/components/button/UloDineLink";
import React, { useState } from "react";
import styles from "./styles/card.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import { RestaurantIcons } from "@/icons/restaurant/icons";

function OverviewTopCard({
  label,
  count,
  rate,
  icon,
  filterItems,
}: OverviewCard) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.overview_card}>
      <div className={styles.overview_card_head}>
        <div className={styles.overview_card_head_left}>
          <span>{icon}</span>
          <p>{label}</p>
        </div>
        {filterItems ? (
          <div className={styles.overview_card_head_right}>
            <span
              className={styles.overview_card_head_right_drop}
              onClick={() => setOpen(!open)}
            >
              <small>{filterItems.selected}</small>
              {GeneralIcons.chevronDown}
            </span>
            {open && (
              <div className={styles.overview_card_head_right_drop_down}>
                {filterItems.filter.map((item: string, i: number) => (
                  <small
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      filterItems.action(item);
                      setOpen(!open);
                    }}
                  >
                    {item}
                  </small>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
      <b className={styles.overview_card_count}>{count}</b>
      <div className={styles.overview_card_bottom}>
        <span>+{rate}% This month</span>
        <UloDineLink
          path={""}
          type={"outline"}
          color="grey"
          label="View All"
          labelColor="green"
          icon={RestaurantIcons.arrowExternal}
        />
      </div>
    </div>
  );
}

export default OverviewTopCard;
