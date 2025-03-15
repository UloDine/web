"use client";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useState } from "react";
import styles from "@/styles/components/input/Input.module.css";

function UloDineSelect({
  onChange,
  items,
  label = "Select an item",
  placeholder = "Placeholder here",
}: Select) {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.select}>
      <label htmlFor={label}>{label}</label>
      <div id={label} className={styles.input} onClick={() => setOpen(!open)}>
        <p data-placeholder={placeholder}>{value}</p>
        {GeneralIcons.chevronDown}
      </div>
      {open && (
        <div className={styles.dropdown}>
          {items.map((item, i) => (
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
      )}
    </div>
  );
}

export default UloDineSelect;
