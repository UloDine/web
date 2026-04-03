"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";
import OverviewTopCard from "./components/card";
import { formatCurrency } from "@/utils/helpers";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import InPageLoader from "@/components/loaders/InPageLoader";

export default function Overview() {
  const router = useRouter();
  const { restaurant } = useProfile();
  const id = restaurant?.id || "";
  const { data, loading } = useFetch<DashboardOverview | null>(
    apiRoutes.restaurant.fetchOverview(id),
    null,
  );

  if (loading || !data) {
    return <InPageLoader text="Fetching your dashboard data..." />;
  } else {
    const overview = data as DashboardOverview;
    const actions = [
      {
        label: "Generate QR",
        icon: GeneralIcons.plus,
        action: () => {
          router.push("/restaurant/management/qr-code");
        },
      },
      {
        label: "Add New Item",
        icon: GeneralIcons.plus,
        action: () => {
          router.push("/restaurant/management/menu-management");
        },
      },
      {
        label: "Manage Orders",
        icon: GeneralIcons.plus,
        action: () => {
          router.push("/restaurant/management/orders");
        },
      },
    ];

    const overviewData = {
      topData: [
        {
          label: "Total Orders Today",
          count: +overview?.total_orders,
          rate: +overview?.orders_growth_percent,
          icon: RestaurantIcons.orderIndicator,
          filterItems: null,
        },
        {
          label: "Pending Orders",
          count: +overview?.pending_orders,
          rate: +overview?.pending_growth_percent,
          icon: RestaurantIcons.orderIndicator,
          filterItems: null,
        },
        {
          label: "Total Sales",
          count: formatCurrency(+overview.total_sales, "ngn"),
          rate: +overview.sales_growth_percent,
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
          count: +overview.total_page_visits,
          rate: +overview.visits_growth_percent,
          icon: RestaurantIcons.reportIndicator,
          filterItems: null,
        },
      ],
      feedbacks: [],
      // feedbacks: feedbacks,
    };

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
}
