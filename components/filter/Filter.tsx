import { GeneralIcons } from "@/icons/general/icons";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setFiltered(selectedFilters);
  }, [selectedFilters]);

  const toggleFilter = (item: FilterOption) => {
    const exists = filtered.find(
      (f) => f.key === item.key && f.value === item.value,
    );

    let newList: FilterOption[];
    if (exists) {
      newList = filtered.filter(
        (f) => !(f.key === item.key && f.value === item.value),
      );
    } else {
      // Keep one selected value per filter key so each group behaves like a single-select option.
      newList = [...filtered.filter((f) => f.key !== item.key), item];
    }

    setFiltered(newList);
    if (updateSelectedFilters) updateSelectedFilters(newList);
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
          <h4>{group.title}</h4>
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
