import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiAdmin = pathname.startsWith("/api/admin");

  // Allow auth endpoints unconditionally
  if (pathname === "/api/admin/auth" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // Guard only /api/admin/* calls via cookie
  if (isApiAdmin) {
    const authed = req.cookies.get("admin_auth")?.value === "1";
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
