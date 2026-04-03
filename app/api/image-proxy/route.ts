import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ message: "Missing image url" }, { status: 400 });
  }

  let response;

  try {
    response = await axios.get(targetUrl, {
      responseType: "arraybuffer",
      validateStatus: () => true,
      headers: {
        cookie: req.headers.get("cookie") || "",
        "ngrok-skip-browser-warning": "69420",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch image";

    return NextResponse.json({ message }, { status: 502 });
  }

  const contentType =
    response.headers["content-type"] || "application/octet-stream";

  return new NextResponse(Buffer.from(response.data), {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}
