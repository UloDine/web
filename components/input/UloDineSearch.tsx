"use client";
import styles from "@/styles/components/input/Input.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useEffect, useState, useRef } from "react";
import { markUsed } from "@/utils/markUsed";

interface SearchResultRestaurant {
  id: string;
  name: string;
  cuisine?: string;
  address?: string;
  rating?: number;
}

const MOCK_RESTAURANTS: SearchResultRestaurant[] = [
  { id: "rest-1", name: "Mama Put Kitchen", cuisine: "Nigerian & African", rating: 4.8 },
  { id: "rest-2", name: "Suya & Grills Spot", cuisine: "BBQ & Fast Food", rating: 4.9 },
  { id: "rest-3", name: "Ocean Basket Seafood", cuisine: "Seafood & Fine Dining", rating: 4.7 },
  { id: "rest-4", name: "Buka Express", cuisine: "Local Delicacies", rating: 4.6 },
  { id: "rest-5", name: "La Terrazza Bistro", cuisine: "Italian & Continental", rating: 4.8 },
];

function UloDineSearch({
  type,
  placeholder = "Search here",
  onSearchChange,
  width,
  value,
}: UloDineSearch) {
  const [searchTerm, setSearchTerm] = useState<string>(value || "");
  const [results, setResults] = useState<SearchResultRestaurant[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  markUsed(type);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000/api";
        const res = await fetch(`${apiBase}/restaurants?search=${encodeURIComponent(searchTerm.trim())}`);
        if (res.ok) {
          const json = await res.json();
          const list: SearchResultRestaurant[] = json.data || json || [];
          setResults(list);
        } else {
          // Fallback search
          const q = searchTerm.toLowerCase();
          const filtered = MOCK_RESTAURANTS.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              (r.cuisine && r.cuisine.toLowerCase().includes(q))
          );
          setResults(filtered);
        }
      } catch {
        // Offline / dev fallback search
        const q = searchTerm.toLowerCase();
        const filtered = MOCK_RESTAURANTS.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            (r.cuisine && r.cuisine.toLowerCase().includes(q))
        );
        setResults(filtered);
      } finally {
        setIsLoading(false);
        onSearchChange?.(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearchChange]);

  const handleSelectRestaurant = (id: string) => {
    setIsOpen(false);
    window.location.href = `/restaurants/${id}`;
  };

  return (
    <div
      ref={dropdownRef}
      className={styles.search_outer_container}
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}%`
            : width
          : "100%",
      }}
    >
      <div className={styles.ulodine_search}>
        <input
          type="search"
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => {
            if (searchTerm.trim()) setIsOpen(true);
          }}
        />
        <button
          onClick={() => {
            if (searchTerm.trim()) {
              window.location.href = `/restaurants?search=${encodeURIComponent(searchTerm)}`;
            }
          }}
        >
          {GeneralIcons.search_white}
        </button>
      </div>

      {isOpen && (
        <div className={styles.search_dropdown_results}>
          {isLoading ? (
            <div className={styles.search_status_item}>Searching restaurants...</div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className={styles.search_result_item}
                onClick={() => handleSelectRestaurant(item.id)}
              >
                <div className={styles.result_icon_badge}>
                  <span>{item.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className={styles.result_details}>
                  <strong>{item.name}</strong>
                  <span>{item.cuisine || "Local & International Venue"}</span>
                </div>
                {item.rating && (
                  <div className={styles.result_rating}>★ {item.rating}</div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.search_status_item}>
              No restaurants matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UloDineSearch;
