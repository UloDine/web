import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");
  const menuId = searchParams.get("menuId");

  if (!restaurantId || !menuId) {
    return new Response(
      JSON.stringify({ error: "Missing restaurantId or menuId" }),
      { status: 400 },
    );
  }

  const path = `/api/menu/${restaurantId}/${menuId}`;
  return proxyRequest(req, path);
}
