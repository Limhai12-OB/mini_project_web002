import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = new Set(["/", "/login", "/register"]);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const isAuthApi = pathname.startsWith("/api/auth");
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico";

  if (isAuthApi || isStaticAsset) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/products", "/products/:path*"],
};
// /((?!.*\\..*|_next).*)