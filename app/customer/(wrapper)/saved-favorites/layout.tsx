import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites | UloDine - Saved Dishes & Restaurants",
  description:
    "Access your saved favorite dishes, meals, and restaurants on UloDine. Quickly reorder your favorites and discover personalized recommendations.",
  keywords: [
    "saved favorites",
    "favorite dishes",
    "favorite restaurants",
    "saved items",
    "wishlist",
    "my favorites",
    "personalized recommendations",
  ],
  openGraph: {
    title: "My Favorites | UloDine - Saved Dishes & Restaurants",
    description:
      "Access your saved favorite dishes and restaurants. Quickly reorder your favorites with UloDine.",
    url: "https://ulodine.com/customer/saved-favorites",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-favorites.png",
        width: 1200,
        height: 630,
        alt: "UloDine My Favorites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Favorites | UloDine - Saved Dishes & Restaurants",
    description:
      "Access your saved favorite dishes and restaurants. Quickly reorder your favorites.",
    images: ["https://ulodine.com/og-favorites.png"],
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/saved-favorites",
  },
};

export default function SavedFavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
