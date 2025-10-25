import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId)
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });

  const path = `/api/restaurants/${restaurantId}/overview`;
  return proxyRequest(req, path);
}
