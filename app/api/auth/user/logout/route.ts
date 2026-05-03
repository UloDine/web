import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  return proxyRequest<{ status: string; message: string; data: null }>(
    req,
    "/api/auth/user/logout",
  );
}
