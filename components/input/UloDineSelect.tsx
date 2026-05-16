"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useState } from "react";
import styles from "@/styles/components/input/Input.module.css";

function UloDineSelect({
  onChange,
  items,
  label = "Select an item",
  placeholder = "Placeholder here",
  defaultSelected,
  searchable,
}: Select) {
  const [value, setValue] = useState<string>(defaultSelected ?? "");
  const [open, setOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState(items);
  return (
    <div className={styles.select}>
      <label htmlFor={label}>{label}</label>
      <div id={label} className={styles.input} onClick={() => setOpen(!open)}>
        <p data-placeholder={placeholder}>{value}</p>
        {GeneralIcons.chevronDown}
      </div>
      {open && items ? (
        <div className={styles.dropdown}>
          {searchable && (
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  const filteredItems = items.filter((item) =>
                    item.label.toLowerCase().includes(query),
                  );
                  setFilteredItems(filteredItems);
                }}
              />
            </div>
          )}
          {filteredItems.map((item, i) => (
            <span
              key={i}
              onClick={() => {
                setValue(item.label);
                onChange(item);
                setOpen(false);
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UloDineSelect;
