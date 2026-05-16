import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Build query string from search params
  const queryString = new URLSearchParams(searchParams).toString();
  const path = `/api/restaurants${queryString ? `?${queryString}` : ""}`;

  return proxyRequest(req, path);
}
