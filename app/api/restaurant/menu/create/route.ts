import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  const path = `/api/menu/`;
  return proxyRequest(req, path);
}
