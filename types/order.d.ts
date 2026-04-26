interface Customer {
  firstName: string;
  lastName: string;
  image: string;
}

interface MenuItem {
  image: string;
  name: string;
  quantity: number;
}

interface Order {
  reference: string;
  id: string;
  status: "Pending" | "In Progress" | "Canceled" | "Ready";
  totalPrice: number;
  discount?: number;
  customer: Customer;
  menuList: MenuItem[];
}

interface CustomerOrder {
  id: string;
  order_number: string;
  restaurant_name: string;
  restaurant_id: string;
  status: "pending" | "preparing" | "ready" | "done" | "cancelled";
  price: number;
  payment_completed: boolean;
  items: CustomerOrderItem[];
  created_at: string;
  discount?: number;
}

interface CustomerOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  media: string;
}
