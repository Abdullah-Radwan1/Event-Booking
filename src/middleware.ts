import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "ar"];
const defaultLocale = "ar";

const publicPaths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];

// Locale detection
function getPreferredLocale(request: NextRequest) {
  const negotiatorHeaders = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

function isPathPublic(path: string) {
  return publicPaths.some((p) => path.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // detect locale
  const localePrefix = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  const strippedPath = localePrefix
    ? pathname.replace(`/${localePrefix}`, "") || "/"
    : pathname;

  // if no locale prefix → redirect with preferred locale
  if (!localePrefix) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ check NextAuth session
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = !!session;

  // 🔒 protected routes
  if (!isAuthenticated && !isPathPublic(strippedPath)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/auth/signin`;
    return NextResponse.redirect(url);
  }

  // 🔓 logged in → trying to access signin/signup → redirect to home
  if (isAuthenticated && isPathPublic(strippedPath)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/`;
    return NextResponse.redirect(url);
  }

  // 👮 role check (example)
  if (isAuthenticated && strippedPath.startsWith("/admin")) {
    if (session?.role === "USER") {
      const url = request.nextUrl.clone();
      url.pathname = `/${localePrefix}/`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|webp|gif|ico|json$)).*)",
  ],
};
