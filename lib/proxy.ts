import { AUTH_ROUTES } from "@/routes/RoutePaths";
import axios, { Method } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyRequest<T>(
  req: NextRequest,
  endpoint: string
): Promise<NextResponse<BaseResponse<T>> | NextResponse> {
  const method = req.method as Method;

  try {
    const contentType = req.headers.get("content-type") || "";

    let data: any;

    if (method !== "GET" && method !== "HEAD") {
      // Detect multipart/form-data or JSON
      if (contentType.includes("multipart/form-data")) {
        // FormData body should be streamed directly (not parsed)
        const buffer = await req.arrayBuffer();
        data = Buffer.from(buffer);
      } else if (contentType.includes("application/json")) {
        data = await req.json();
      } else {
        // fallback for raw text or other encodings
        data = await req.text();
      }
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      method,
      headers: {
        ...Object.fromEntries(req.headers),
        "X-Internal-Secret": process.env.INTERNAL_SECRET_KEY || "",
        host: undefined, // don't forward Next.js host
      },
      data,
      withCredentials: true,
      responseType: "arraybuffer", // handle binary safely
      validateStatus: () => true, // prevent axios from throwing on 4xx
    });

    if (response.status === 401) {
      const redirectUrl = new URL(AUTH_ROUTES.RES_LOGIN, req.url);
      return NextResponse.redirect(redirectUrl);
    }

    const setCookie = response.headers["set-cookie"];
    const responseData = response.headers["content-type"]?.includes(
      "application/json"
    )
      ? JSON.parse(Buffer.from(response.data).toString("utf8"))
      : Buffer.from(response.data);

    const res = NextResponse.json<BaseResponse<T>>(responseData, {
      status: response.status,
    });

    if (setCookie) {
      res.headers.set(
        "set-cookie",
        Array.isArray(setCookie) ? setCookie.join(", ") : setCookie
      );
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
