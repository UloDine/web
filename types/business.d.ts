interface RestaurantOverview {
  total_orders: number;
  total_orders_change: string;

  pending_orders: number;
  pending_orders_change: string;

  total_sales: number;
  total_sales_change: string;

  page_views: number;
  page_views_change: string;

  feedbacks: Feedback[];
}
