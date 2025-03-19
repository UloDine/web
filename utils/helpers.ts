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
    `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`
  );
  const data: IPGeolocation = await response.json();
  console.log(data);

  return data;
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

export function formatCurrency(amount: number, symbol?: string) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: symbol?.toUpperCase() ?? "NGN",
  });
}

export function formatTime(
  date: Date | string | number,
  format: "short" | "long" | "full" = "short"
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
