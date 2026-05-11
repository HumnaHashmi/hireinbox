import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "hireinbox_session";
const PROTECTED = ["/dashboard"];
const AUTH = ["/login", "/signup", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = Boolean(request.cookies.get(COOKIE)?.value);

  if (PROTECTED.some((r) => pathname === r || pathname.startsWith(`${r}/`)) && !auth) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  if (AUTH.some((r) => pathname === r) && auth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)", "/"],
};
