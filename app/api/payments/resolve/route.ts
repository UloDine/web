import { proxyRequest } from "@/lib/proxy";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return proxyRequest(request, "/api/payments/resolve");
}
