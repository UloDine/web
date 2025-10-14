import axios, { Method } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyRequest(
  req: NextRequest,
  endpoint: string
): Promise<NextResponse> {
  const method = req.method as Method;
  const body =
    method !== "GET" && method !== "HEAD" ? await req.json() : undefined;

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": process.env.INTERNAL_SECRET_KEY || "",
        Cookie: req.headers.get("cookie") || "",
      },
      data: body,
      withCredentials: true,
      validateStatus: () => true,
    });

    // ✅ Safely handle array or string
    const setCookie = response.headers["set-cookie"];
    const res = NextResponse.json(response.data, { status: response.status });

    if (setCookie) {
      if (Array.isArray(setCookie)) {
        // Combine cookies as one header (Next requires string)
        res.headers.set("set-cookie", setCookie.join(", "));
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }

    return res;
  } catch (error: any) {
    console.error("Proxy error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
