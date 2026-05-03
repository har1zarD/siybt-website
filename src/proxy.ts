import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const user = process.env.ADMIN_USERNAME;
    const pass = process.env.ADMIN_PASSWORD;
    if (!user || !pass) {
      return new NextResponse(
        "Admin disabled. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
        { status: 503 }
      );
    }
    const auth = req.headers.get("authorization") ?? "";
    const expected = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
    if (auth !== expected) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="SIYBT Admin", charset="UTF-8"' },
      });
    }
    return NextResponse.next();
  }

  return intl(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
