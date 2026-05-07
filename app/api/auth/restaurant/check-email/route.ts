import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email") || "";
  return proxyRequest(
    req,
    `/api/auth/restaurant/check-email?email=${encodeURIComponent(email)}`,
  );
}
