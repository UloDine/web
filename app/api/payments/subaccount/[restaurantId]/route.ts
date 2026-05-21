import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> },
) {
  const { restaurantId } = await params;
  if (!restaurantId) {
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });
  }

  return proxyRequest(req, `/api/payments/subaccount/${restaurantId}`);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> },
) {
  const { restaurantId } = await params;
  if (!restaurantId) {
    return new Response(JSON.stringify({ error: "Missing restaurant ID" }), {
      status: 400,
    });
  }

  return proxyRequest(req, `/api/payments/subaccount/${restaurantId}`);
}
