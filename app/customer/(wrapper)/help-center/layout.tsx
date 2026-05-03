import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support | UloDine - Customer Support Center",
  description:
    "Get help and support from UloDine's customer service team. Contact us via email, phone, or live chat for assistance with your orders and account.",
  keywords: [
    "help center",
    "customer support",
    "contact support",
    "FAQ",
    "customer service",
    "support center",
    "help desk",
  ],
  openGraph: {
    title: "Help & Support | UloDine - Customer Support Center",
    description:
      "Contact UloDine's customer support team. Email, phone, and live chat support available.",
    url: "https://ulodine.com/customer/help-center",
    type: "website",
    images: [
      {
        url: "https://ulodine.com/og-help.png",
        width: 1200,
        height: 630,
        alt: "UloDine Help & Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help & Support | UloDine - Customer Support Center",
    description:
      "Contact UloDine's customer support team. Email, phone, and live chat support available.",
    images: ["https://ulodine.com/og-help.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ulodine.com/customer/help-center",
  },
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
