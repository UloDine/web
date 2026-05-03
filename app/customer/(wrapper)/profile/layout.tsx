import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | UloDine - Manage Your Account",
  description:
    "Manage your UloDine profile, update personal information, view order history, manage addresses, and control account settings.",
  keywords: [
    "user profile",
    "account settings",
    "personal information",
    "account management",
    "profile settings",
    "my account",
  ],
  openGraph: {
    title: "My Profile | UloDine - Manage Your Account",
    description:
      "Manage your UloDine profile, update personal information, and control account settings.",
    url: "https://ulodine.com/customer/profile",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-profile.png",
        width: 1200,
        height: 630,
        alt: "UloDine My Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Profile | UloDine - Manage Your Account",
    description:
      "Manage your UloDine profile, update personal information, and control account settings.",
    images: ["https://ulodine.com/og-profile.png"],
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/profile",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
