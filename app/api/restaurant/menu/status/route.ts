import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");
  const menuId = searchParams.get("menuId");
  const status = searchParams.get("status");

  if (!restaurantId || !menuId || !status) {
    return new Response(
      JSON.stringify({ error: "Missing restaurantId, menuId or status" }),
      { status: 400 },
    );
  }

  const path = `/api/menu/status/${restaurantId}/${menuId}/${encodeURIComponent(
    status,
  )}`;
  return proxyRequest(req, path);
}
