"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import { formatCurrency } from "@/utils/helpers";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import { feedbacks } from "@/res/feedbacks";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import { useEffect, useState } from "react";
import orders from "@/res/orders";
import OrderCard from "./components/OrderCard";
import Filter from "@/components/filter/Filter";

function Orders() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [searched, setSearched] = useState<Order[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filterObjects = [
    {
      title: "Filter by Status",
      items: ["Pending", "In Progress", "Completed", "Canceled"],
    },
  ];
  function searchOrders(keyword: string | string[]) {
    let filtered: Order[] = [];

    if (Array.isArray(keyword)) {
      filtered = orders.filter((order) =>
        keyword.some(
          (item) => order.status.toLowerCase() === item.toLowerCase()
        )
      );
    } else {
      filtered = orders.filter((order) =>
        order.reference.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setSearched(filtered);
  }

  useEffect(() => {
    setOrdersData(orders);
  }, [searched]);
  return (
    <section className={styles.orders}>
      <PageTitleBar title='Orders' />
      <div className={styles.orders_header}>
        <div className={styles.orders_header_left}>
          <span className={styles.length}>
            {searched.length > 0 ? searched.length : ordersData.length} items
          </span>
          <div className={styles.search}>
            {GeneralIcons.search}
            <input
              type='search'
              placeholder='Search orders...'
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
          <button className={styles.add_btn}>
            {GeneralIcons.plus} Add New Item
          </button>
        </div>
      </div>
      <div className={styles.orders_wrapper}>
        {searched.length > 0
          ? searched.map((order, i) => <OrderCard {...order} key={i} />)
          : ordersData.map((order, i) => <OrderCard {...order} key={i} />)}
      </div>
    </section>
  );
}

export default Orders;
