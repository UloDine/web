import { AUTH_ROUTES } from "@/routes/RoutePaths";
import axios, { Method } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyRequest<T>(
  req: NextRequest,
  endpoint: string,
): Promise<NextResponse<BaseResponse<T>> | NextResponse> {
  const method = req.method as Method;

  try {
    const contentType = req.headers.get("content-type") || "";

    let data: unknown;

    if (method !== "GET" && method !== "HEAD") {
      if (contentType.includes("multipart/form-data")) {
        const buffer = await req.arrayBuffer();
        data = Buffer.from(buffer);
      } else if (contentType.includes("application/json")) {
        data = await req.json();
      } else {
        data = await req.text();
      }
    }

    const targetUrl = `${process.env.API_URL}${endpoint}`;

    // ensure cookies are forwarded to the upstream
    const cookieHeader = req.headers.get("cookie");
    const response = await axios({
      url: targetUrl,
      method,
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        "content-type": req.headers.get("content-type") || "",
        "X-Internal-Secret": process.env.INTERNAL_SECRET_KEY || "",
        "ngrok-skip-browser-warning": "69420",
      },
      data,
      withCredentials: true,
      responseType: "arraybuffer",
      validateStatus: () => true,
    });

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
  } catch (error: unknown) {
    // Normalize the error so we don't use `any`
    let message = "Internal Server Error";
    let statusCode = 500;

    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "response" in error) {
      // best-effort when axios error object is present
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = error as any;
      message = e.response?.data || e.message || message;
      statusCode = e.response?.status || statusCode;
    }

    console.error("Proxy error:", message);

    return NextResponse.json<BaseResponse<T>>(
      {
        message,
        status: "failed",
        data: null,
      },
      { status: statusCode },
    );
  }
}
