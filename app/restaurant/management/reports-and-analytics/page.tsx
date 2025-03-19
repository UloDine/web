import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import { RestaurantIcons } from "@/icons/restaurant/icons";
import { formatCount, formatCurrency } from "@/utils/helpers";
import ReportCard from "./components/ReportCard";
import orders from "@/res/orders";
import styles from "./style/index.module.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

export default function ResportsAndAnalytics() {
  const totalSales = orders
    .map((order) => order.totalPrice)
    .reduce((accu, curr) => accu + curr, 0);
  const reports: ReportCard[] = [
    {
      icon: RestaurantIcons.salesIndicator,
      label: "Total Revenue",
      value: formatCurrency(totalSales, "ngn"),
    },
    {
      icon: RestaurantIcons.orderIndicator,
      label: "Total Order",
      value: formatCount(orders.length),
    },
    {
      icon: RestaurantIcons.salesIndicator,
      label: "Average Order Value (AOV)",
      value: formatCurrency(totalSales / orders.length, "ngn"),
    },
  ];
  return (
    <section className={styles.report_page}>
      <PageTitleBar title='Reports & Analytics' />
      <div className={styles.report_page_export}>
        <button>
          {GeneralIcons.export} <span>Export</span>
        </button>
      </div>
      <div className={styles.report_page_cards}>
        {reports.map((report, i) => (
          <ReportCard {...report} key={i} />
        ))}
      </div>
      <div className={styles.charts}>
        <div className={styles.charts_chart}>
          <div>
            <p>Sales Trend</p>
          </div>
          <LineChart />
        </div>
        <div className={styles.charts_chart}>
          <div>
            <p>Category Performance</p>
          </div>
          <BarChart />
        </div>
      </div>
    </section>
  );
}
