const orders: Order[] = [];

const statuses: Array<"Pending" | "In Progress" | "Canceled" | "Ready"> = [
  "Pending",
  "In Progress",
  "Canceled",
  "Ready",
];

// Predefined placeholder images
const placeholderImage = "https://via.placeholder.com/200"; // Standard placeholder

for (let i = 0; i < 100; i++) {
  orders.push({
    reference: `ORD_${Math.random().toString(36).substring(2, 22)}`, // Ensures 20+ characters
    id: crypto.randomUUID(), // ✅ Generates a proper UUID
    status: statuses[Math.floor(Math.random() * statuses.length)],
    totalPrice: parseFloat((Math.random() * 50 + 10).toFixed(2)),
    discount:
      Math.random() > 0.7
        ? parseFloat((Math.random() * 10).toFixed(2))
        : undefined,
    customer: {
      firstName: [
        "James",
        "Emily",
        "Ethan",
        "Sophia",
        "Daniel",
        "Emma",
        "Olivia",
        "Lucas",
      ][Math.floor(Math.random() * 8)],
      lastName: [
        "Taylor",
        "Anderson",
        "Harris",
        "Clark",
        "Lewis",
        "Walker",
        "Hall",
        "Allen",
      ][Math.floor(Math.random() * 8)],
      image: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 100)}.jpg`,
    },
    menuList: [
      {
        image: placeholderImage,
        name: [
          "Sushi",
          "Burger",
          "Pizza",
          "Pasta",
          "Steak",
          "Salad",
          "Soup",
          "Sandwich",
        ][Math.floor(Math.random() * 8)],
        quantity: Math.floor(Math.random() * 3) + 1,
      },
      {
        image: placeholderImage,
        name: [
          "Coca-Cola",
          "Orange Juice",
          "Red Wine",
          "Milkshake",
          "Lemonade",
          "Coffee",
          "Tea",
        ][Math.floor(Math.random() * 7)],
        quantity: Math.floor(Math.random() * 2) + 1,
      },
    ],
  });
}

export default orders;
