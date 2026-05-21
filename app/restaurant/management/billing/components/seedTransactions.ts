export const SEED_TRANSACTIONS = [
  {
    id: "txn_001",
    amount: 12500,
    date: "May 6, 2026",
    status: "completed",
    description: "Order payout #10012002344",
  },
  {
    id: "txn_002",
    amount: 8400,
    date: "May 5, 2026",
    status: "pending",
    description: "Order payout #10012002339",
  },
  {
    id: "txn_003",
    amount: 16750,
    date: "May 4, 2026",
    status: "completed",
    description: "Order payout #10012002331",
  },
  {
    id: "txn_004",
    amount: 6200,
    date: "May 2, 2026",
    status: "failed",
    description: "Card payment declined for plan renewal",
  },
  {
    id: "txn_005",
    amount: 9100,
    date: "Apr 30, 2026",
    status: "completed",
    description: "Order payout #10012002298",
  },
  {
    id: "txn_006",
    amount: 9900,
    date: "Apr 28, 2026",
    status: "completed",
    description: "Order payout #10012002284",
  },
  // generated transactions up to 150
  ...Array.from({ length: 144 }).map((_, idx) => {
    const i = idx + 7; // starting from txn_007
    const id = `txn_${String(i).padStart(3, "0")}`;
    // deterministic pseudo-random amounts and statuses
    const amount = 3000 + ((i * 137) % 17000);
    const day = (i % 28) + 1;
    const monthIndex = Math.floor(i / 28) % 6; // spread across months
    const months = ["May", "Apr", "Mar", "Feb", "Jan", "Dec"];
    const month = months[monthIndex] || "May";
    const date = `${month} ${day}, 2026`;
    const statusChoices = ["completed", "pending", "failed"];
    const status = statusChoices[i % statusChoices.length];
    const description =
      status === "failed"
        ? "Card payment failed or declined"
        : `Order payout #1001200${20000 + i}`;

    return {
      id,
      amount,
      date,
      status,
      description,
    };
  }),
];

// Normalize to plain array (expand the mapped items)
export const SEED_TRANSACTIONS_FLAT = SEED_TRANSACTIONS.flatMap((t) =>
  Array.isArray(t) ? t : [t],
);

// If other code imports SEED_TRANSACTIONS, prefer the flat list
export default SEED_TRANSACTIONS_FLAT;
