import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  // Create business subaccount
  return proxyRequest(req, `/api/payments/subaccount`);
}
