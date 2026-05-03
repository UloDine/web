import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Restaurants | UloDine - Find Local Eateries & Order Online",
  description:
    "Browse and search for restaurants on UloDine. Discover featured and nearby restaurants, filter by cuisine, and place your food order online.",
  keywords: [
    "restaurants",
    "browse restaurants",
    "local restaurants",
    "food delivery",
    "restaurant search",
    "nearby restaurants",
    "featured restaurants",
  ],
  openGraph: {
    title: "Browse Restaurants | UloDine - Find Local Eateries & Order Online",
    description:
      "Discover and browse local restaurants. Search by cuisine, filter by rating, and order food online.",
    url: "https://ulodine.com/customer/restaurants",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-restaurants.png",
        width: 1200,
        height: 630,
        alt: "UloDine Browse Restaurants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Restaurants | UloDine - Find Local Eateries & Order Online",
    description:
      "Discover and browse local restaurants. Search by cuisine, filter by rating, and order food online.",
    images: ["https://ulodine.com/og-restaurants.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/restaurants",
  },
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
