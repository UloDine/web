import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";

interface RestaurantPublicData {
  id: string;
  name: string;
  address: string;
  category: string | null;
  cuisine: string | null;
  email: string | null;
  phone: string | null;
  banner: string | null;
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

async function getRestaurant(id: string): Promise<RestaurantPublicData | null> {
  try {
    const headerList = await headers();
    const host =
      headerList.get("x-forwarded-host") || headerList.get("host") || "";
    const protocol = headerList.get("x-forwarded-proto") || "http";

    if (!host) {
      return null;
    }

    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/restaurants/public/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const payload = (await res.json()) as {
      status: string;
      data: RestaurantPublicData | null;
    };

    return payload?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    return {
      title: "Restaurant | UloDine",
      description: "Explore restaurant details and menu on UloDine.",
      robots: { index: false, follow: true },
    };
  }

  const siteUrl = "https://ulodine.com";
  const canonical = `${siteUrl}/restaurants/${restaurant.id}`;
  const category = restaurant.category || restaurant.cuisine || "Restaurant";
  const description = `${restaurant.name} on UloDine. Browse ${category.toLowerCase()} options, view business contact details, and order from ${restaurant.address}.`;

  return {
    title: `${restaurant.name} | UloDine`,
    description,
    keywords: [
      restaurant.name,
      category,
      "UloDine",
      "restaurant menu",
      "food delivery",
      restaurant.address,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${restaurant.name} | UloDine`,
      description,
      url: canonical,
      type: "website",
      images: restaurant.banner
        ? [
            {
              url: restaurant.banner,
              width: 1200,
              height: 630,
              alt: `${restaurant.name} banner`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${restaurant.name} | UloDine`,
      description,
      images: restaurant.banner ? [restaurant.banner] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function RestaurantDetailsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default RestaurantDetailsLayout;
