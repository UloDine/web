import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "UloDine | Empowering local restaurants with modern order management",
  description: "SaaS Platform | Native + Web Apps | Local Dining Simplified",
  alternates: {
    canonical: "https://ulodine.com",
    languages: {
      "en-US": "https://ulodine.com/en-US",
    },
  },
  openGraph: {
    title:
      "UloDine | Empowering local restaurants with modern order management",
    description: "SaaS Platform | Native + Web Apps | Local Dining Simplified",
    url: "https://ulodine.com",
    siteName: "UloDine",
    images: [{ url: "https://ulodine.com/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
