"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import { useState } from "react";
import Filter from "@/components/filter/Filter";
import MenuCard from "./components/MenuCard";
import { useMenuContext } from "@/context/menu/MenuContext";
import InPageLoader from "@/components/loaders/InPageLoader";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";

function MenuManagement() {
  const {
    data,
    loading,
    // refetch,
    // keyword,
    setKeyword,
    // page,
    // setPage,
    setItemStatus,
    setStockStatus,
    toggleModal,
  } = useMenuContext();
  // const [menuData, setMenuData] = useState<Menu[]>([]);
  // const [searched, setSearched] = useState<Menu[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  // const {pagination } = data;
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
        { key: "itemStatus", value: "Pending" },
        { key: "itemStatus", value: "In Progress" },
        { key: "itemStatus", value: "Completed" },
        { key: "itemStatus", value: "Canceled" },
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
              onClick={() => setOpenFilter((prev) => !prev)}
            >
              {GeneralIcons.filter}
            </button>
            {openFilter && (
              <Filter
                filters={filterObjects}
                action={(filters) => {
                  console.log(filters);
                  filters.forEach((filter) => {
                    if (filter.key === "stockStatus") {
                      setStockStatus(filter.value);
                    } else {
                      setItemStatus(filter.value);
                    }
                  });
                  // searchOrders(filters);
                  // setSelectedFilter([...selectedFilter, ...filters]);
                }}
                onClose={() => setOpenFilter((prev) => !prev)}
                // selectedFilters={selectedFilter}
                // updateSelectedFilters={(newList) =>
                //   setSelectedFilter((prev) =>
                //     prev.filter((item) => {
                //       if (!newList.includes(item)) {
                //         return item;
                //       }
                //     })
                //   )
                // }
              />
            )}
          </div>
          <button className={styles.add_btn} onClick={toggleModal}>
            {GeneralIcons.plus} Add New Item
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
