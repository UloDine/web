"use client";
import styles from "@/styles/components/input/Input.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useEffect, useState } from "react";
import { markUsed } from "@/utils/markUsed";

function UloDineSearch({
  type,
  placeholder = "Search here",
  onSearchChange,
  width,
}: UloDineSearch) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // some consumers pass a `type` prop that's unused here; mark it used
  markUsed(type);

  useEffect(() => {
    if (!searchTerm) return;

    const delayDebounce = setTimeout(() => {
      onSearchChange?.(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div
      className={styles.ulodine_search}
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}%`
            : width
          : "100%",
      }}
    >
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button onClick={() => onSearchChange(searchTerm)}>
        {GeneralIcons.search_white}
      </button>
    </div>
  );
}

export default UloDineSearch;
