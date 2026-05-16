import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });
  }

  return proxyRequest(req, `/api/restaurants/${restaurantId}/settings/account`);
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });
  }

  return proxyRequest(req, `/api/restaurants/${restaurantId}/settings/account`);
}
