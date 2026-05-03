import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | UloDine - Track Your Food Orders",
  description:
    "View your active orders and order history on UloDine. Track delivery status, reorder your favorites, and manage all your food orders in one place.",
  keywords: [
    "order tracking",
    "food orders",
    "order history",
    "active orders",
    "delivery tracking",
    "my orders",
  ],
  openGraph: {
    title: "My Orders | UloDine - Track Your Food Orders",
    description:
      "View active orders and order history. Track delivery status and manage all your food orders.",
    url: "https://ulodine.com/customer/orders",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-orders.png",
        width: 1200,
        height: 630,
        alt: "UloDine My Orders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Orders | UloDine - Track Your Food Orders",
    description:
      "View active orders and order history. Track delivery status and manage all your food orders.",
    images: ["https://ulodine.com/og-orders.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/orders",
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
