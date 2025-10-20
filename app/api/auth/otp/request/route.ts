import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  return proxyRequest<OTPRequestResponse>(req, "/api/auth/send-otp");
}
