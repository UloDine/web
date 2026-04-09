"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import Filter from "@/components/filter/Filter";
import MenuCard from "./components/MenuCard";
import { useMenuContext } from "@/context/menu/MenuContext";
import InPageLoader from "@/components/loaders/InPageLoader";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import { useCallback, useEffect, useState } from "react";

const MENU_FILTER_STORAGE_KEY = "menu-management-selected-filters";

function MenuManagement() {
  const {
    data,
    loading,
    setKeyword,
    setItemStatus,
    setStockStatus,
    toggleModal,
    openFilter,
    setOpenFilter,
  } = useMenuContext();
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  const applySelectedFilters = useCallback(
    (filters: FilterOption[]) => {
      const stock =
        filters.find((filter) => filter.key === "stockStatus")?.value || "";
      const status =
        filters.find((filter) => filter.key === "itemStatus")?.value || "";

      setStockStatus(stock);
      setItemStatus(status);
    },
    [setItemStatus, setStockStatus],
  );

  useEffect(() => {
    const saved = localStorage.getItem(MENU_FILTER_STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        return;
      }

      const validFilters = parsed.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          typeof item.key === "string" &&
          typeof item.value === "string",
      ) as FilterOption[];

      setSelectedFilters(validFilters);
      applySelectedFilters(validFilters);
    } catch {
      localStorage.removeItem(MENU_FILTER_STORAGE_KEY);
    }
  }, [applySelectedFilters]);

  useEffect(() => {
    localStorage.setItem(
      MENU_FILTER_STORAGE_KEY,
      JSON.stringify(selectedFilters),
    );
  }, [selectedFilters]);

  const filterObjects = [
    {
      title: "Filter by Stock Status",
      items: [
        { key: "stockStatus", value: "Available" },
        { key: "stockStatus", value: "Out of Stock" },
      ],
    },
    {
      title: "Filter by Status",
      items: [
        { key: "itemStatus", value: "Ready" },
        { key: "itemStatus", value: "Preparing" },
        { key: "itemStatus", value: "Not ready" },
      ],
    },
  ];

  return (
    <section className={styles.orders}>
      <PageTitleBar title="Menu Management" />
      <div className={styles.orders_header}>
        <div className={styles.orders_header_left}>
          <span className={styles.length}>
            {data ? data.pagination.total : 0} items
          </span>
          <div className={styles.search}>
            {GeneralIcons.search}
            <input
              type="search"
              placeholder="Search menu..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.orders_header_right}>
          <div className={styles.filter_wrapper}>
            <button
              className={styles.filter}
              onClick={() => setOpenFilter(!openFilter)}
            >
              {GeneralIcons.filter}
            </button>
            {openFilter && (
              <Filter
                filters={filterObjects}
                action={(filters) => {
                  setSelectedFilters(filters);
                  applySelectedFilters(filters);
                  setOpenFilter(false);
                }}
                selectedFilters={selectedFilters}
                updateSelectedFilters={setSelectedFilters}
                onClose={() => setOpenFilter(false)}
              />
            )}
          </div>
          <button className={styles.add_btn} onClick={toggleModal}>
            {GeneralIcons.plus} <span>Add New Item</span>
          </button>
        </div>
      </div>
      {loading || !data ? (
        <InPageLoader text="Loading menu..." />
      ) : data.result.length === 0 ? (
        <EmptyScreen
          title="No Menu Available Yet!"
          subTitle="Start creating menu to appear here"
          action={toggleModal}
          showButton
          buttonLabel="Add Menu"
        />
      ) : (
        <div className={styles.orders_wrapper}>
          {data.result.map((menu, i) => (
            <MenuCard {...menu} key={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MenuManagement;
