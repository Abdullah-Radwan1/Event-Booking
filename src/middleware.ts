import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
// Paths that should be blocked for authenticated users
const Paths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];
const headers = { "accept-language": "ar,en;q=0.5" };
const locales = ["en", "ar"];
const languages = new Negotiator({ headers }).languages();
const defaultLocale = "ar";
// Paths that should be accessible without authentication

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  function getLocale() {
    return match(languages, locales, defaultLocale);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale();

    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
  }
  ////////////////////////////////////////////////////
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is authenticated
  if (session) {
    const shouldRedirect = Paths.includes(pathname);
    if (shouldRedirect) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Optional role-based redirect
    if (session.role === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If user is not authenticated and path is not public, redirect to login
    const isPublic = Paths.some((path) => pathname.startsWith(path));
    if (!isPublic) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
