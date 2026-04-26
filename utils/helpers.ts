import { IPGEOLOCATION_API_KEY } from "@/env";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return passwordRegex.test(password);
}

export function isEmpty(value: string) {
  if (value == "" || value == " ") {
    return true;
  } else {
    return false;
  }
}

export async function getCountryDetails(): Promise<IPGeolocation> {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`,
  );
  const data: IPGeolocation = await response.json();

  return data;
}

function shouldProxyAsset(path: string): boolean {
  return (
    path.startsWith("/uploads/") ||
    path.startsWith("/api/media/") ||
    path.startsWith("/api/media?")
  );
}

export function resolveAssetUrl(path?: string | null): string {
  if (!path) return "";

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      const baseHost = baseUrl ? new URL(baseUrl).host : "";

      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return `/api/image-proxy?url=${encodeURIComponent(path)}`;
      }

      if (baseHost && url.host === baseHost) {
        return `/api/image-proxy?url=${encodeURIComponent(path)}`;
      }
    } catch {
      // Fall through to the original URL for malformed values.
    }

    return path;
  }

  if (shouldProxyAsset(path)) {
    const assetPath = path.startsWith("/") ? path : `/${path}`;
    const targetUrl = `${baseUrl}${assetPath}`;

    return `/api/image-proxy?url=${encodeURIComponent(targetUrl)}`;
  }

  return path;
}

export const countryPhoneLengths: Record<string, number> = {
  NG: 10, // Nigeria
  GH: 9, // Ghana
  US: 10, // United States
  GB: 10, // United Kingdom
  IN: 10, // India
  CA: 10, // Canada
  AU: 9, // Australia
  KE: 9, // Kenya
  ZA: 9, // South Africa
  DE: 11, // Germany
  FR: 9, // France
  BR: 11, // Brazil
  // Add more as needed
};

export function formatPhoneNumber(input: string, maxLength: number): string {
  // Remove non-numeric characters
  const numericInput = input.replace(/\D/g, "");

  // Limit length
  return numericInput.slice(0, maxLength);
}

export function formatCurrency(
  amount: number,
  symbol?: string,
  locale?: string,
) {
  return amount.toLocaleString(locale ?? "en-NG", {
    style: "currency",
    currency: symbol?.toUpperCase() ?? "NGN",
  });
}

export function calculateDiscountedPrice(
  price: number,
  discount?: number,
): number {
  if (!discount || discount <= 0) return price;
  const discountedPrice = price - (price * discount) / 100;
  return Math.max(discountedPrice, 0); // Ensure price doesn't go below 0
}

export function formatTime(
  date: Date | string | number,
  format: "short" | "long" | "full" = "short",
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error("Invalid date provided");

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: format === "long" ? "2-digit" : undefined,
    hour12: true,
  };

  return format === "full"
    ? d.toTimeString()
    : d.toLocaleTimeString("en-US", options);
}

export function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 1_000_000)
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  if (count < 1_000_000_000)
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
}

export function getMonthsUpToCurrent(): string[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthIndex = new Date().getMonth(); // Get current month (0-based index)

  return months.slice(0, currentMonthIndex + 1); // Get months from January to current month
}

/**
 * Build a full URL with query parameters.
 *
 * @param baseUrl - The base endpoint (e.g. /api/menu/restaurant/123)
 * @param params - Object containing any query parameters
 * @returns Fully formatted URL string
 */
export function queryBuilder(
  baseUrl: string,
  params?: Record<string, any>,
): string {
  if (!params || Object.keys(params).length === 0) return baseUrl;

  const query = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // For array params, like tags=["vegan","spicy"]
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${query}`;
}

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export function isAllNullOrUndefined(obj: Record<string, any>): boolean {
  return Object.values(obj).every(
    (value) => value === null || value === undefined || value === "",
  );
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function capitalizeWord(str: string): string {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
