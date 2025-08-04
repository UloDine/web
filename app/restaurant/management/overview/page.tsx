"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import OverviewTopCard from "./components/card";
import { formatCurrency } from "@/utils/helpers";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import { useApiService } from "@/context/ApiServiceContext";
import { useEffect } from "react";
import { apiRoutes } from "@/lib/apiRoutes";

export default function Overview() {
  const api = useApiService();
  const actions = [
    {
      label: "Generate QR",
      icon: GeneralIcons.plus,
      action: () => {},
    },
    {
      label: "Add New Item",
      icon: GeneralIcons.plus,
      action: () => {},
    },
    {
      label: "Manage Orders",
      icon: GeneralIcons.plus,
      action: () => {},
    },
  ];

  const overviewData = {
    topData: [
      {
        label: "Total Orders Today",
        count: 56,
        rate: 5,
        icon: RestaurantIcons.orderIndicator,
        filterItems: null,
      },
      {
        label: "Pending Orders",
        count: 20,
        rate: 5,
        icon: RestaurantIcons.orderIndicator,
        filterItems: null,
      },
      {
        label: "Total Sales",
        count: formatCurrency(250780, "ngn"),
        rate: 5,
        icon: RestaurantIcons.salesIndicator,
        filterItems: {
          filter: ["Daily", "Weekly", "Monthly"],
          selected: "Daily",
          action: function (newSelected: string) {
            this.selected = newSelected;
          },
        },
      },
      {
        label: "Page Visits",
        count: 450,
        rate: 5,
        icon: RestaurantIcons.reportIndicator,
        filterItems: null,
      },
    ],
    feedbacks: [],
    // feedbacks: feedbacks,
  };

  useEffect(() => {
    api
      .get<RestaurantOverview>(apiRoutes.restaurant.fetchOverview)
      .then((res) => {
        if (res.status === "success") {
          console.log("Overview Data:", res.data);
        }
      });
  }, []);
  return (
    <section className={styles.overview}>
      <PageTitleBar
        title="Overview"
        rightContent={
          <div className={styles.action_buttons}>
            {actions.map((action, i) => (
              <button key={i} onClick={action.action}>
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        }
      />
      <div className={styles.scrollable}>
        <div className={styles.cards}>
          {overviewData.topData.map((item, i) => {
            return <OverviewTopCard {...item} key={i} />;
          })}
        </div>
        <div className={styles.overview_feedbacks}>
          <h2 className={styles.overview_feedbacks_title}>
            Customer feedbacks
          </h2>
          <div>
            {overviewData.feedbacks.length > 0 ? (
              <></>
            ) : (
              <EmptyScreen
                title="No Feedback From Customers at The Moment!"
                subTitle="Feedback from customers will show up here."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
