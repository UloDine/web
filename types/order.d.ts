declare global {
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
}

export {};
