import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const path = `/api/cuisines`;

  return proxyRequest(req, path);
}
