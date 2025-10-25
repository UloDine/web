interface DashboardOverview {
  restaurant_id: string;
  total_orders: number;
  pending_orders: number;
  total_sales: string;
  total_page_visits: number;
  total_reviews: number;
  average_rating: string;
  current_month_start: string;
  last_month_start: string;
  orders_this_month: number;
  orders_last_month: number;
  pending_this_month: number;
  pending_last_month: number;
  sales_this_month: string;
  sales_last_month: string;
  visits_this_month: number;
  visits_last_month: number;
  orders_growth_percent: string;
  sales_growth_percent: string;
  visits_growth_percent: string;
  pending_growth_percent: string;
  latest_reviews: any[];
}
