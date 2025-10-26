import { AUTH_ROUTES } from "@/routes/RoutePaths";
import axios, { Method } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyRequest<T>(
  req: NextRequest,
  endpoint: string
): Promise<NextResponse<BaseResponse<T>> | NextResponse> {
  const method = req.method as Method;

  try {
    // Log incoming proxy request (useful for debugging)
    console.log("[proxy] incoming -> method:", method, "endpoint:", endpoint);

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

    const targetUrl = `${process.env.API_URL}${endpoint}`;
    // Log the target url before sending
    console.log("[proxy] target url ->", targetUrl);

    // ensure cookies are forwarded to the upstream
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) console.log("[proxy] cookie header present");

    const response = await axios({
      url: targetUrl,
      method,
      headers: {
        ...Object.fromEntries(req.headers),
        // explicit cookie forwarding to avoid edge/format issues
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        "X-Internal-Secret": process.env.INTERNAL_SECRET_KEY || "",
        host: undefined, // don't forward Next.js host
        "ngrok-skip-browser-warning": "69420",
      },
      data,
      withCredentials: true,
      responseType: "arraybuffer", // handle binary safely
      validateStatus: () => true, // prevent axios from throwing on 4xx
    });

    // Log response summary for debugging
    console.log(
      `[proxy] response -> status: ${response.status}, content-type: ${response.headers["content-type"]}`
    );

    if (response.status === 401) {
      // If upstream says unauthorized, clear cookies and redirect to login
      const redirectUrl = new URL(AUTH_ROUTES.RES_LOGIN, req.url);
      const redirectRes = NextResponse.redirect(redirectUrl);
      // Delete cookies (clear on client)
      req.cookies.getAll().forEach((cookie) => {
        redirectRes.cookies.set({
          name: cookie.name,
          value: "",
          path: "/",
          expires: new Date(0),
        });
      });
      return redirectRes;
    }

    const setCookie = response.headers["set-cookie"];
    const contentTypeHeader = response.headers["content-type"] || "";

    // If upstream returned JSON, parse and use NextResponse.json for proper typing
    if (contentTypeHeader.includes("application/json")) {
      const parsed = JSON.parse(Buffer.from(response.data).toString("utf8"));
      const res = NextResponse.json<BaseResponse<T>>(parsed, {
        status: response.status,
      });

      // forward set-cookie headers if present
      if (setCookie) {
        if (Array.isArray(setCookie)) {
          setCookie.forEach((c) => res.headers.append("set-cookie", c));
        } else {
          res.headers.append("set-cookie", setCookie as string);
        }
      }

      return res;
    }

    // Non-JSON response (HTML, images, etc.) - stream raw bytes back with original content-type
    const body = Buffer.from(response.data);
    const res = new NextResponse(body, {
      status: response.status,
      headers: { "content-type": contentTypeHeader },
    });

    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((c) => res.headers.append("set-cookie", c));
      } else {
        res.headers.append("set-cookie", setCookie as string);
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
