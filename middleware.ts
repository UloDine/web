import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES, RESTAURANT_MANAGEMENT_ROUTES } from "./routes/RoutePaths";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  console.log("[Middleware] Path:", pathname, "Token:", token);

  // --- Skip static files, images, and Next internals ---
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // --- Explicit public pages ---
  const publicPages = ["/", "/about", "/contact"]; // add more here
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // --- Logout handling ---
  if (pathname === "/logout") {
    const res = NextResponse.redirect(new URL(AUTH_ROUTES.RES_LOGIN, req.url));
    res.cookies.delete("token");
    return res;
  }

  // --- API routes ---
  if (pathname.startsWith("/api/")) {
    const publicApiPaths = [
      "/api/auth/restaurant/login",
      "/api/auth/restaurant/register",
      "/api/auth/otp/request",
      "/api/auth/otp/verify",
    ];

    if (!publicApiPaths.includes(pathname) && !token) {
      return new Response(
        JSON.stringify({
          status: "failed",
          message: "Authentication required",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return NextResponse.next();
  }

  // --- Restaurant routes ---
  if (pathname.startsWith("/restaurant")) {
    const restaurantPublicPaths = [
      AUTH_ROUTES.RES_LOGIN,
      AUTH_ROUTES.RES_SIGNUP,
    ];

    if (!token && !restaurantPublicPaths.includes(pathname)) {
      // Not logged in, trying to access protected restaurant page
      return NextResponse.redirect(new URL(AUTH_ROUTES.RES_LOGIN, req.url));
    }

    if (token && restaurantPublicPaths.includes(pathname)) {
      // Logged in, trying to access login/signup page
      return NextResponse.redirect(
        new URL(RESTAURANT_MANAGEMENT_ROUTES.OVERVIEW, req.url)
      );
    }
  }

  // --- Default: allow everything else ---
  return NextResponse.next();
}

// --- Matcher ---
export const config = {
  matcher: [
    "/restaurant/:path*", // restaurant pages
    "/api/:path*", // API routes
    "/logout", // logout
    "/", // root page
  ],
};
