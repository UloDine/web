import { GeneralIcons } from "@/icons/general/icons";
import React, { useState } from "react";
import styles from "./style/index.module.css";
import UloDIneButton from "../button/UloDIneButton";

function Filter({
  action,
  filters,
  onClose,
  selectedFilters = [],
  updateSelectedFilters,
}: FilterProps) {
  const [filtered, setFiltered] = useState<FilterOption[]>(selectedFilters);

  const toggleFilter = (item: FilterOption) => {
    setFiltered((prev) => {
      const exists = prev.find(
        (f) => f.key === item.key && f.value === item.value
      );

      let newList;
      if (exists) {
        newList = prev.filter(
          (f) => !(f.key === item.key && f.value === item.value)
        );
      } else {
        newList = [...prev, item];
      }

      if (updateSelectedFilters) updateSelectedFilters(newList);
      return newList;
    });
  };

  const isSelected = (item: FilterOption) =>
    filtered.some((f) => f.key === item.key && f.value === item.value);

  return (
    <section className={styles.filter_con}>
      <div className={styles.filter_con_header}>
        <h3>Filter</h3>
        <span onClick={onClose}>{GeneralIcons.closeBlack}</span>
      </div>

      {filters.map((group, i) => (
        <div key={i}>
          <p>{group.title}</p>
          <ul>
            {group.items.map((item, j) => (
              <li key={j} onClick={() => toggleFilter(item)}>
                <span className={isSelected(item) ? styles.active : ""}></span>
                <small className={isSelected(item) ? styles.active : ""}>
                  {item.value}
                </small>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <UloDIneButton
        color="green"
        label="Apply filter"
        type="secondary"
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
