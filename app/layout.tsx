import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ApiServiceProvider } from "@/context/ApiServiceContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { AppProvider } from "@/context/app/AppContext";
import { AlertProvider } from "@/context/alert/AlertContext";
import ProgressBar from "@/components/Progressbar";

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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#00A886",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <AppProvider>
          <ProgressBar />
          <AlertProvider>
            <AuthProvider>
              <ToastProvider>
                <ApiServiceProvider>{children}</ApiServiceProvider>
              </ToastProvider>
            </AuthProvider>
          </AlertProvider>
        </AppProvider>
      </body>
    </html>
  );
}
