import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Supported locales
const locales = ["en", "ar"];
const defaultLocale = "ar";

// Paths that can be accessed without authentication
const publicPaths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];

/**
 * Get the user's preferred locale based on Accept-Language header
 */
function getPreferredLocale(request: NextRequest) {
  // Convert request headers to an object Negotiator can use
  const negotiatorHeaders = Object.fromEntries(request.headers.entries());

  // Parse the accepted languages from the request
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // Match the best locale based on supported ones
  return match(languages, locales, defaultLocale);
}

/**
 * Check if the path is publicly accessible
 */
function isPathPublic(path: string) {
  return publicPaths.includes(path);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect if the pathname already starts with a locale prefix (/en, /ar)
  const localePrefix = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  // Remove the locale from the path so we can match it against the public paths
  const strippedPath = localePrefix
    ? pathname.replace(`/${localePrefix}`, "") || "/"
    : pathname;

  // If there's no locale in the URL, redirect to the same path with the preferred locale
  if (!localePrefix) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Get the user's session (if logged in)
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the requested path is publicly accessible
  const isPublic = isPathPublic(strippedPath);

  // 🔒 User is NOT authenticated and trying to access a protected route
  if (!session && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/auth/signin`;
    return NextResponse.redirect(url);
  }

  // 🔓 User is authenticated and trying to access a public page (like signin/signup)
  if (session && isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/`;
    return NextResponse.redirect(url);
  }

  // 👮‍♂️ Role-based access control: "USER" cannot access "/admin" routes
  if (session?.role === "USER" && strippedPath.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/`;
    return NextResponse.redirect(url);
  }

  // ✅ All good — allow the request to proceed
  return NextResponse.next();
}

// Matcher: apply this middleware to all routes except these exclusions
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
