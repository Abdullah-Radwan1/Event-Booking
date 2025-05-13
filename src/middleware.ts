import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const headers = { "accept-language": "ar,en;q=0.5" };
const locales = ["en", "ar"];
const defaultLocale = "ar";
const publicPaths = [
  "/auth/signin",
  "/auth/signup",
  "/signin",
  "/signup",
  "/events",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePrefix = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  const strippedPath = localePrefix
    ? pathname.replace(`/${localePrefix}`, "") || "/"
    : pathname;

  function getLocale() {
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
  }

  // Locale redirect
  if (!localePrefix) {
    const locale = getLocale();
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublic = publicPaths.includes(strippedPath);

  // Unauthenticated user trying to access protected path
  if (!session && !isPublic) {
    request.nextUrl.pathname = `/${localePrefix}/auth/signin`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Authenticated user trying to access sign in/up
  if (session && isPublic) {
    request.nextUrl.pathname = `/${localePrefix}/`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Role-based redirect
  if (session?.role === "USER" && strippedPath.startsWith("/admin")) {
    request.nextUrl.pathname = `/${localePrefix}/`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
