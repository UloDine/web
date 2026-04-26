export const sample: CustomerOrder[] = [
  {
    id: "1",
    order_number: "123456",
    restaurant_name: "Pizza Place",
    restaurant_id: "rest1",
    status: "preparing",
    price: 25.99,
    payment_completed: true,
    discount: 20,
    items: [
      {
        id: "item1",
        name: "Pepperoni Pizza",
        quantity: 1,
        price: 15.99,
        media:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "item2",
        name: "Garlic Bread",
        quantity: 2,
        price: 5.0,
        media:
          "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    created_at: "2024-06-01T12:00:00Z",
  },
  {
    id: "2",
    order_number: "123456",
    restaurant_name: "Pizza Place",
    restaurant_id: "rest1",
    status: "pending",
    price: 25.99,
    payment_completed: true,
    items: [
      {
        id: "item1",
        name: "Pepperoni Pizza",
        quantity: 1,
        price: 15.99,
        media:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "item2",
        name: "Garlic Bread",
        quantity: 2,
        price: 5.0,
        media:
          "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    created_at: "2024-06-01T12:00:00Z",
  },
];
