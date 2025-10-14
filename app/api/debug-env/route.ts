// app/api/debug-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Loaded key:", process.env.INTERNAL_SECRET_KEY);
  return NextResponse.json({
    INTERNAL_SECRET_KEY: process.env.INTERNAL_SECRET_KEY || "undefined",
  });
}
