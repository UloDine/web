import { BillingSmallIcon, OrderSmallIcon, PlanIcon } from "@/icons/customer";
import { GeneralIcons } from "@/icons/general/icons";
import React, { useState, useEffect } from "react";
import styles from "../style/index.module.css";
import { formatCurrency } from "@/utils/helpers";

function Overview() {
  const filterRef = React.useRef<HTMLDivElement>(null);
  const filterButtonRef = React.useRef<HTMLSpanElement>(null);
  const [activeFilter, setActiveFilter] = useState({
    label: "Daily",
    value: "daily",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const filters = [
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Yearly",
      value: "yearly",
    },
  ];

  const stats: BillingStat[] = [
    {
      title: "Total Items Sold",
      value: 200,
      icon: <OrderSmallIcon />,
      sub: `+0% This month`,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(1290500, "ngn"),
      icon: <BillingSmallIcon />,
      sub: `+0% This month`,
    },
    {
      title: "Plan",
      value: "Free",
      icon: <PlanIcon />,
      sub: `15/20 Orders this month`,
      action: {
        label: "Upgrade",
        action: function () {},
      },
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        filterRef.current &&
        !filterRef.current.contains(target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(target)
      ) {
        setFilterOpen(false);
      }
    }

    if (filterOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterOpen]);

  return (
    <section className={styles.overview}>
      <div className={styles.header}>
        <h3>Overview</h3>
        <div className={styles.drop_wrapper}>
          <span ref={filterButtonRef} onClick={() => setFilterOpen(true)}>
            {activeFilter.label}
          </span>
          {GeneralIcons.chevronDown}
          {filterOpen && (
            <div ref={filterRef} className={styles.drop}>
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter);
                    setFilterOpen(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cards}>
        {stats.map((stat) => (
          <div key={stat.title} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.left}>
                <span>{stat.icon}</span>
                <h4>{stat.title}</h4>
              </div>
              {stat.action && (
                <button onClick={stat.action.action}>
                  {stat.action.label}
                </button>
              )}
            </div>
            <h2>{stat.value}</h2>
            {stat.sub && <small>{stat.sub}</small>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Overview;
