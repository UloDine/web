import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES } from "./routes/RoutePaths";

export function middleware(req: NextRequest) {
  const publicPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/restaurants/*",
  ];
  const path = req.nextUrl.pathname;

  if (publicPaths.includes(path)) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.RES_LOGIN, req.url));
  }

  return NextResponse.next();
}
