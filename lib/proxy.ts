import axios, { Method } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyRequest<T>(
  req: NextRequest,
  endpoint: string
): Promise<NextResponse<BaseResponse<T>> | NextResponse> {
  const method = req.method as Method;
  const body =
    method !== "GET" && method !== "HEAD" ? await req.json() : undefined;

  try {
    console.log(process.env.INTERNAL_SECRET_KEY);

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
      validateStatus: () => true, // don't throw for 4xx
    });

    // ⚠️ If unauthorized — redirect to login
    if (response.status === 401) {
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // ✅ Normal response handling
    const setCookie = response.headers["set-cookie"];
    const res = NextResponse.json<BaseResponse<T>>(response.data, {
      status: response.status,
    });

    if (setCookie) {
      if (Array.isArray(setCookie)) {
        res.headers.set("set-cookie", setCookie.join(", "));
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }

    return res;
  } catch (error: any) {
    console.error("Proxy error:", error.response?.data || error.message);
    return NextResponse.json<BaseResponse<T>>(
      {
        message: error.message || "Internal Server Error",
        status: "failed",
        data: null,
      },
      { status: error.response?.status || 500 }
    );
  }
}
