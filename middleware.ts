import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and login API without authentication
  if (
    pathname === "/admin" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin/")) {
    const session = req.cookies.get("sonderspace_admin");

    if (session?.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};