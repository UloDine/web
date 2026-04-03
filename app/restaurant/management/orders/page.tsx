"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import Filter from "@/components/filter/Filter";
import { useFetch } from "@/hooks/useFetch";
import { useProfile } from "@/context/ProfileContext";
import { apiRoutes } from "@/lib/apiRoutes";
import InPageLoader from "@/components/loaders/InPageLoader";

function Orders() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [searched, setSearched] = useState<Order[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const { restaurant } = useProfile();
  const id = restaurant?.id || "";
  const { data, loading } = useFetch<Order[]>(
    apiRoutes.restaurant.order.fetchAllByRestaurant(id),
    [],
  );

  const filterObjects = [
    {
      title: "Filter by Status",
      items: [
        { key: "status", value: "Pending" },
        { key: "status", value: "In Progress" },
        { key: "status", value: "Completed" },
        { key: "status", value: "Canceled" },
      ],
    },
  ];

  function searchOrders(keyword: string | string[]) {
    const source = ordersData;
    let filtered: Order[] = source;

    if (Array.isArray(keyword)) {
      filtered = source.filter((order) =>
        keyword.some(
          (item) => order.status.toLowerCase() === item.toLowerCase(),
        ),
      );
    } else {
      const normalized = keyword.trim().toLowerCase();
      filtered = !normalized
        ? source
        : source.filter((order) =>
            order.reference.toLowerCase().includes(normalized),
          );
    }

    setSearched(filtered);
  }

  useEffect(() => {
    setOrdersData(data ?? []);
    setSearched(data ?? []);
  }, [data]);

  if (loading || !data) {
    return <InPageLoader text="Fetching your delicious orders..." />;
  } else {
    return (
      <section className={styles.orders}>
        <PageTitleBar title="Orders" />
        <div className={styles.orders_header}>
          <div className={styles.orders_header_left}>
            <span className={styles.length}>
              {searched.length > 0 ? searched.length : ordersData.length} items
            </span>
            <div className={styles.search}>
              {GeneralIcons.search}
              <input
                type="search"
                placeholder="Search orders..."
                onChange={(e) => searchOrders(e.target.value)}
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
                    const values = filters.map((f) => f.value);
                    searchOrders(values);
                    setOpenFilter(false);
                  }}
                  onClose={() => setOpenFilter(false)}
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
          {(searched.length > 0 ? searched : ordersData).map((order, i) => (
            <OrderCard {...order} key={order.id || i} />
          ))}
        </div>
      </section>
    );
  }
}

export default Orders;
