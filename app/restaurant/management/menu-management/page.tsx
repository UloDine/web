"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import { formatCurrency } from "@/utils/helpers";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import { useEffect, useState } from "react";
import Filter from "@/components/filter/Filter";
import menuList from "@/res/menu";
import MenuCard from "./components/MenuCard";
import { useMenuContext } from "@/context/menu/MenuContext";

function MenuManagement() {
  const { toggleModal } = useMenuContext();
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [searched, setSearched] = useState<Menu[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filterObjects = [
    {
      title: "Filter by Stock Status",
      items: ["Available", "Out of Stock"],
    },
    {
      title: "Filter by Status",
      items: ["Pending", "In Progress", "Completed", "Canceled"],
    },
  ];
  function searchOrders(keyword: string | string[]) {
    let filtered: Menu[] = [];

    if (Array.isArray(keyword)) {
      filtered = menuList.filter((menu) =>
        keyword.some(
          (item) =>
            menu.status.toLowerCase() === item.toLowerCase() ||
            menu.stockStatus.toLowerCase() === item.toLowerCase()
        )
      );
    } else {
      filtered = menuList.filter((menu) =>
        menu.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setSearched(filtered);
  }

  useEffect(() => {
    setMenuData(menuList);
  }, [searched]);
  return (
    <section className={styles.orders}>
      <PageTitleBar title='Menu Management' />
      <div className={styles.orders_header}>
        <div className={styles.orders_header_left}>
          <span className={styles.length}>
            {searched.length > 0 ? searched.length : menuData.length} items
          </span>
          <div className={styles.search}>
            {GeneralIcons.search}
            <input
              type='search'
              placeholder='Search menu...'
              onChange={(e) => searchOrders(e.target.value)}
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
                  searchOrders(filters);
                  setSelectedFilter([...selectedFilter, ...filters]);
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
      <div className={styles.orders_wrapper}>
        {searched.length > 0
          ? searched.map((menu, i) => <MenuCard {...menu} key={i} />)
          : menuData.map((menu, i) => <MenuCard {...menu} key={i} />)}
      </div>
    </section>
  );
}

export default MenuManagement;
