import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId)
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });

  const queryEntries = Array.from(searchParams.entries()).filter(
    ([key]) => key !== "restaurantId"
  );

  // Construct final API path
  const path = `/api/menu/restaurant/${restaurantId}${
    queryEntries ? `?${queryEntries}` : ""
  }`;
  return proxyRequest(req, path);
}
