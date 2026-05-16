import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const path = `/api/restaurants/public/${encodeURIComponent(id)}`;
  return proxyRequest(req, path);
}
