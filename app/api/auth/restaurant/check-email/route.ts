import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email") || "";
  console.log("[check-email route] Email:", email);
  console.log("[check-email route] INTERNAL_SECRET_KEY:", process.env.INTERNAL_SECRET_KEY?.substring(0, 10) + "...");
  const response = await proxyRequest(
    req,
    `/api/auth/restaurant/check-email?email=${encodeURIComponent(email)}`,
  );
  console.log("[check-email route] Response status:", response.status);
  return response;
}
