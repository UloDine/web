import { GeneralIcons } from "@/icons/general/icons";
import React, { useState } from "react";
import styles from "./style/index.module.css";
import UloDIneButton from "../button/UloDIneButton";

function Filter({
  action,
  filters,
  onClose,
  selectedFilters,
  updateSelectedFilters,
}: FilterProps) {
  const [filtered, setFiltered] = useState<string[]>([]);
  return (
    <section className={styles.filter_con}>
      <div className={styles.filter_con_header}>
        <h3>Filter</h3>
        <span onClick={onClose}>{GeneralIcons.closeBlack}</span>
      </div>
      {filters.map((filter, i) => (
        <div key={i}>
          <p>{filter.title}</p>
          <ul>
            {filter.items.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  if (filtered.includes(item)) {
                    setFiltered((prev) => {
                      const newList = prev.filter((str) => str !== item);
                      if (updateSelectedFilters) updateSelectedFilters(newList);
                      return [...newList];
                    });
                  } else {
                    setFiltered((prev) => [...prev, item]);
                  }
                }}
              >
                <span
                  className={
                    filtered.includes(item) || selectedFilters?.includes(item)
                      ? styles.active
                      : ""
                  }
                ></span>{" "}
                <small
                  className={
                    filtered.includes(item) || selectedFilters?.includes(item)
                      ? styles.active
                      : ""
                  }
                >
                  {item}
                </small>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <UloDIneButton
        color='green'
        label='Apply filter'
        type='secondary'
        onClick={() => {
          action(filtered);
          onClose();
        }}
        style={{ width: "100%", borderRadius: "0.5rem" }}
      />
    </section>
  );
}

export default Filter;
